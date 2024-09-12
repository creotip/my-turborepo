ALTER TABLE "car_postings" ALTER COLUMN "features" SET DATA TYPE jsonb USING "features"::jsonb;
ALTER TABLE "car_postings" ALTER COLUMN "features" SET DEFAULT '[]'::jsonb;
ALTER TABLE "car_postings" ALTER COLUMN "features" SET NOT NULL;
