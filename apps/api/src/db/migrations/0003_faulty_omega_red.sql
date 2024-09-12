CREATE TABLE IF NOT EXISTS "car_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_posting_id" integer NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "car_postings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"vehicle_id" integer,
	"brand_id" integer NOT NULL,
	"model_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"mileage" integer NOT NULL,
	"year" integer NOT NULL,
	"color" varchar(50) NOT NULL,
	"condition" varchar(50) NOT NULL,
	"transmission" varchar(20) NOT NULL,
	"fuel_type" varchar(20) NOT NULL,
	"features" text,
	"location" varchar(255) NOT NULL,
	"contact_phone" varchar(20),
	"contact_email" varchar(255),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_images" ADD CONSTRAINT "car_images_car_posting_id_car_postings_id_fk" FOREIGN KEY ("car_posting_id") REFERENCES "public"."car_postings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_postings" ADD CONSTRAINT "car_postings_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_postings" ADD CONSTRAINT "car_postings_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car_postings" ADD CONSTRAINT "car_postings_model_id_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."models"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
