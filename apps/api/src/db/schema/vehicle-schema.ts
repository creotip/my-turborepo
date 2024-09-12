import { pgTable, serial, text, integer, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})

export const brandsRelations = relations(brands, ({ many }) => ({
  models: many(models),
}))

export const models = pgTable('models', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  brandId: integer('brand_id').references(() => brands.id),
})

export const modelsRelations = relations(models, ({ one }) => ({
  brand: one(brands, {
    fields: [models.brandId],
    references: [brands.id],
  }),
}))

export const vehicles = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  brandId: integer('brand_id').references(() => brands.id),
  modelId: integer('model_id').references(() => models.id),
  year: integer('year').notNull(),
  color: varchar('color', { length: 50 }).notNull(),
})

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  brand: one(brands, {
    fields: [vehicles.brandId],
    references: [brands.id],
  }),
  model: one(models, {
    fields: [vehicles.modelId],
    references: [models.id],
  }),
}))
