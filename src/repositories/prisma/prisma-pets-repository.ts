import { Prisma } from '@prisma/client'
import { PetsRepository, SearchManyParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    throw new Error('Method not implemented.')
  }

  async findById(id: string) {
    throw new Error('Method not implemented.')
  }

  async searchMany(data: SearchManyParams) {
    throw new Error('Method not implemented.')
  }
}
