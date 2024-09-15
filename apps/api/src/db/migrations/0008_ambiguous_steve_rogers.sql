DROP TABLE "car_images";--> statement-breakpoint
ALTER TABLE "car_postings" ADD COLUMN "images" jsonb DEFAULT '[]'::jsonb;