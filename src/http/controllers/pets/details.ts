import { makeGetPetService } from '@/services/factories/make-get-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const petDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = petDetailsParamsSchema.parse(request.params)

  const getPetService = makeGetPetService()

  const { pet } = await getPetService.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
