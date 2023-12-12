import { PrimaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { FindOngService } from '../find-ong'

export function makeFindOngService() {
  const ongsRepository = new PrimaOngsRepository()
  const service = new FindOngService(ongsRepository)

  return service
}
