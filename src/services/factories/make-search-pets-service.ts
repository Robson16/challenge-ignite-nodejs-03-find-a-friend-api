import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetService } from '../search-pets'

export function makeSearchPetsService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new SearchPetService(petsRepository)

  return service
}
