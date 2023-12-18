import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'

export async function ongsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/ongs', create)

  app.get('/ongs/search', search)
}
