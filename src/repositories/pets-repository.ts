import { Pet, Prisma } from '@prisma/client'

export interface SearchManyParams {
  ongsId?: string[]
  age?: string
  type?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string
  page: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchMany(data: SearchManyParams): Promise<Pet[]>
}
