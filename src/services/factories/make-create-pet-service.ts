import { PrimaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../create-pet'

export function makeCreatePetService() {
  const ongsRepository = new PrimaOngsRepository()
  const petsRepository = new PrismaPetsRepository()
  const service = new CreatePetService(ongsRepository, petsRepository)

  return service
}
