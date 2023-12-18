import { OngAlreadyExistsError } from '@/services/errors/ong-already-exists-error'
import { makeCreateOngService } from '@/services/factories/make-create-ong-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOngBodySchema = z.object({
    title: z.string(),
    description: z.string().default(''),
    phone: z.string(),
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
    title,
    description,
    phone,
    address,
    country,
    state,
    city,
    zip_code,
    latitude,
    longitude,
  } = createOngBodySchema.parse(request.body)

  try {
    const createOngService = makeCreateOngService()

    await createOngService.execute({
      userId: request.user.sub,
      title,
      description,
      phone,
      address,
      country,
      state,
      city,
      zip_code,
      latitude,
      longitude,
    })
  } catch (error) {
    if (error instanceof OngAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
