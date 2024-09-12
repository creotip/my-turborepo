import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.ts'

const pool = new Pool({
  user: 'myuser',
  password: 'mypassword',
  host: 'localhost',
  port: 5432,
  database: 'mydb',
})

export const db = drizzle(pool, { schema })
