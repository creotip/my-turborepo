import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
  decimal,
  jsonb,
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import {
  type InferSelectModel,
  type InferInsertModel,
  getTableColumns,
} from 'drizzle-orm'
import {
  brands,
  models,
  vehicleCategories,
  vehicleTypes,
} from './vehicle-schema.ts'
import { users } from './user-schema.ts'

interface ImageObject {
  url: string
  isPrimary: boolean
  alt: string
}

export const carPostings = pgTable('car_postings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  vehicleCategoryId: integer('vehicle_category_id')
    .references(() => vehicleCategories.id)
    .notNull(),
  vehicleTypeId: integer('vehicle_type_id')
    .references(() => vehicleTypes.id)
    .notNull(),
  brandId: integer('brand_id')
    .references(() => brands.id)
    .notNull(),
  modelId: integer('model_id')
    .references(() => models.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  mileage: integer('mileage').notNull(),
  year: integer('year').notNull(),
  color: varchar('color', { length: 50 }).notNull(),
  condition: varchar('condition', { length: 50 }).notNull(),
  transmission: varchar('transmission', { length: 20 }).notNull(),
  fuelType: varchar('fuel_type', { length: 20 }).notNull(),
  tags: text('tags')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  location: varchar('location', { length: 255 }).notNull(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  contactEmail: varchar('contact_email', { length: 255 }),
  isActive: boolean('is_active').default(true),
  images: jsonb('images').notNull().$type<ImageObject[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const carPostingsRelations = relations(carPostings, ({ one }) => ({
  user: one(users, {
    fields: [carPostings.userId],
    references: [users.id],
  }),
  vehicleCategory: one(vehicleCategories, {
    fields: [carPostings.vehicleCategoryId],
    references: [vehicleCategories.id],
  }),
  vehicleType: one(vehicleTypes, {
    fields: [carPostings.vehicleTypeId],
    references: [vehicleTypes.id],
  }),
  brand: one(brands, {
    fields: [carPostings.brandId],
    references: [brands.id],
  }),
  model: one(models, {
    fields: [carPostings.modelId],
    references: [models.id],
  }),
}))
