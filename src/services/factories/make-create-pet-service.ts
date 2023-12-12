import { PrimaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreateOngService } from '../create-ong'

export function makeCreatePetService() {
  const ongsRepository = new PrimaOngsRepository()
  const petsRepository = new PrismaPetsRepository()
  const service = new CreateOngService(ongsRepository, petsRepository)

  return service
}
