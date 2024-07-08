import { integer, text, pgTable, pgEnum, serial, time, numeric, json } from "drizzle-orm/pg-core";
import { Address } from '@/lib/types';

export const statusEnum = pgEnum('status', ['draft', 'pending', 'paid']);

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  password: text('password')
});

export const invoice = pgTable('invoice', {
  id: serial('id').primaryKey(),
  createdAt: time('created_at').defaultNow(),
  paymentDue: time('payment_due'),
  description: text('description'),
  paymentTerms: integer('payment_terms'),
  clientName: text('client_name'),
  clientEmail: text('client_email'),
  status: statusEnum('status').default('draft'),
  senderAddress: json('sender_address').$type<Address>(),
  clientAddress: json('client_address').$type<Address>(),
  // items: InvoiceItem[];
  total: numeric('total'),
  userId: integer('user_id').references(() => user.id)
});