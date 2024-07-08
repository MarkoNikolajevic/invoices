import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const connectionString = neon(process.env.DATABASE_URL!);
const db = drizzle(connectionString);

export default db;