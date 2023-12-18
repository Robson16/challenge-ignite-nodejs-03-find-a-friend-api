import { makeSearchOngsService } from '@/services/factories/make-search-ongs-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchOngsQuerySchema = z.object({
    title: z.string().default(''),
    city: z.string().default(''),
    state: z.string().default(''),
    page: z.coerce.number().min(1).default(1),
  })

  const { title, city, state, page } = searchOngsQuerySchema.parse(
    request.query,
  )

  const searchOngsService = makeSearchOngsService()

  const { ongs } = await searchOngsService.execute({
    title,
    city,
    state,
    page,
  })

  return reply.status(200).send({
    ongs,
  })
}
