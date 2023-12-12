import { PrimaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { SearchOngsService } from '../search-ongs'

export function makeSearchOngsService() {
  const ongsRepository = new PrimaOngsRepository()
  const service = new SearchOngsService(ongsRepository)

  return service
}
