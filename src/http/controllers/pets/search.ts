import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.string().default(''),
    type: z.string().default(''),
    size: z.string().default(''),
    energy_level: z.string().default(''),
    independence_level: z.string().default(''),
    page: z.coerce.number().min(1).default(1),
  })

  const {
    city,
    state,
    age,
    type,
    size,
    energy_level,
    independence_level,
    page,
  } = searchPetsQuerySchema.parse(request.query)

  const searchPetsService = makeSearchPetsService()

  const { pets } = await searchPetsService.execute({
    city,
    state,
    age,
    type,
    size,
    energy_level,
    independence_level,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
