import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
  decimal,
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import { brands, vehicles, models } from './vehicle-schema.ts'

export const carPostings = pgTable('car_postings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(), // Assuming you have a users table
  vehicleId: integer('vehicle_id').references(() => vehicles.id),
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
  tags: text('tags2')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  location: varchar('location', { length: 255 }).notNull(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  contactEmail: varchar('contact_email', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const carImages = pgTable('car_images', {
  id: serial('id').primaryKey(),
  carPostingId: integer('car_posting_id')
    .references(() => carPostings.id)
    .notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  isPrimary: boolean('is_primary').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const carPostingsRelations = relations(carPostings, ({ one, many }) => ({
  vehicle: one(vehicles, {
    fields: [carPostings.vehicleId],
    references: [vehicles.id],
  }),
  brand: one(brands, {
    fields: [carPostings.brandId],
    references: [brands.id],
  }),
  model: one(models, {
    fields: [carPostings.modelId],
    references: [models.id],
  }),
  images: many(carImages),
}))

export const carImagesRelations = relations(carImages, ({ one }) => ({
  carPosting: one(carPostings, {
    fields: [carImages.carPostingId],
    references: [carPostings.id],
  }),
}))
