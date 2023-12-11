import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchOngsService } from '../search-ongs'

export function makeSearchPetsService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new SearchOngsService(petsRepository)

  return service
}
