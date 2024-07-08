import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

require('dotenv').config({ path: '.env.local' })

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
})