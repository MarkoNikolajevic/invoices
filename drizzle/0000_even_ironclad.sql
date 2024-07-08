DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('draft', 'pending', 'paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" time DEFAULT now(),
	"payment_due" time,
	"description" text,
	"payment_terms" integer,
	"client_name" text,
	"client_email" text,
	"status" "status" DEFAULT 'draft',
	"sender_address" json,
	"client_address" json,
	"total" numeric,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice" ADD CONSTRAINT "invoice_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
