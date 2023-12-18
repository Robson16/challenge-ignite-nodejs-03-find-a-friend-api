import { Pet, Prisma } from '@prisma/client'

interface Filters {
  city?: string
  state?: string
  age?: string
  type?: string
  size?: string
  energy_level?: string
  independence_level?: string
}

export interface FilterParams {
  filters: Filters
  page: number
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  filter(data: FilterParams): Promise<Pet[]>
}
