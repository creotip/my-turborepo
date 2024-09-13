CREATE TABLE IF NOT EXISTS "vehicle_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"name" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "vehicles";--> statement-breakpoint
ALTER TABLE "car_postings" DROP CONSTRAINT "car_postings_vehicle_id_vehicles_id_fk";
--> statement-breakpoint
ALTER TABLE "car_postings" ADD COLUMN "vehicle_category_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "car_postings" ADD COLUMN "vehicle_type_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_category_id_vehicle_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."vehicle_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_postings" ADD CONSTRAINT "car_postings_vehicle_category_id_vehicle_categories_id_fk" FOREIGN KEY ("vehicle_category_id") REFERENCES "public"."vehicle_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_postings" ADD CONSTRAINT "car_postings_vehicle_type_id_vehicle_types_id_fk" FOREIGN KEY ("vehicle_type_id") REFERENCES "public"."vehicle_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "car_postings" DROP COLUMN IF EXISTS "vehicle_id";