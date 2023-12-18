import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    ong_id: z.string().uuid(),
    name: z.string(),
    about: z.string(),
    age: z.string(),
    type: z.enum(['DOG', 'CAT']),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    requirements: z.string().array(),
    address: z.string(),
    country: z.string().default('Brazil'),
    state: z.string(),
    city: z.string(),
    zip_code: z.coerce.number(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    ong_id,
    name,
    about,
    age,
    type,
    size,
    energy_level,
    independence_level,
    environment,
    requirements,
    address,
    country,
    state,
    city,
    zip_code,
    latitude,
    longitude,
  } = createPetBodySchema.parse(request.body)

  try {
    const createPetService = makeCreatePetService()

    await createPetService.execute({
      ongId: ong_id,
      name,
      about,
      age,
      type,
      size,
      energy_level,
      independence_level,
      environment,
      requirements,
      address,
      country,
      state,
      city,
      zip_code,
      latitude,
      longitude,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
