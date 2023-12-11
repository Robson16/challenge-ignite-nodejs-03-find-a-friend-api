import { Prisma } from '@prisma/client'
import { FilterParams, OngsRepository } from '../ongs-repository'

export class PrimaOngsRepository implements OngsRepository {
  async findById(id: string) {
    throw new Error('Method not implemented.')
  }

  async findByTitle(title: string) {
    throw new Error('Method not implemented.')
  }

  async filter(data: FilterParams) {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.OngUncheckedCreateInput) {
    throw new Error('Method not implemented.')
  }
}
