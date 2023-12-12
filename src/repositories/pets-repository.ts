import { Pet, Prisma } from '@prisma/client'

interface SearchManyFilters {
  city?: string
  state?: string
  age?: string
  type?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string
}

export interface SearchManyParams {
  filters: SearchManyFilters
  page: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(data: SearchManyParams): Promise<Pet[]>
}
