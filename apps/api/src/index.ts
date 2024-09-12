import { createServer } from 'node:http'
import { buildSchema } from 'drizzle-graphql'
import { createYoga } from 'graphql-yoga'
import { log } from '@repo/logger'
import { db } from './db'

log('DATABASE_URL', process.env.DATABASE_URL)

const { schema } = buildSchema(db)

const yoga = createYoga({ schema })

const server = createServer(yoga)

const port = process.env.PORT || 4000
server.listen(port, () => {
  log(`Server is running on http://localhost:${port}/graphql`)
})
