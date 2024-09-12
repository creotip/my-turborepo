ALTER TABLE "car_postings" ADD COLUMN "tags2" text[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "car_postings" DROP COLUMN IF EXISTS "features";