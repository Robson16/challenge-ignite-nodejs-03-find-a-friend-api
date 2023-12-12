import { PrimaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateOngService } from '../create-ong'

export function makeCreateOngService() {
  const usersRepository = new PrismaUsersRepository()
  const ongsRepository = new PrimaOngsRepository()
  const service = new CreateOngService(usersRepository, ongsRepository)

  return service
}
