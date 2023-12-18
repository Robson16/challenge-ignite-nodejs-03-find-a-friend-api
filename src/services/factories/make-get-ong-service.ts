import { PrimaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { GetOngService } from '../get-ong'

export function makeGetOngService() {
  const ongsRepository = new PrimaOngsRepository()
  const service = new GetOngService(ongsRepository)

  return service
}
