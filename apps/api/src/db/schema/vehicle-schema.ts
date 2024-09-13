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

// Main vehicle categories
export const vehicleCategories = pgTable('vehicle_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})

// Vehicle types within each category
export const vehicleTypes = pgTable('vehicle_types', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').references(() => vehicleCategories.id),
  name: text('name').notNull(),
})

// Relationships
export const vehicleCategoriesRelations = relations(
  vehicleCategories,
  ({ many }) => ({
    types: many(vehicleTypes),
  }),
)

export const vehicleTypesRelations = relations(vehicleTypes, ({ one }) => ({
  category: one(vehicleCategories, {
    fields: [vehicleTypes.categoryId],
    references: [vehicleCategories.id],
  }),
}))
