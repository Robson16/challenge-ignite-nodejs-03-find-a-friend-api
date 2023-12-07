import { Prisma, Ong } from '@prisma/client'

export interface FilterParams {
  title?: string
  city?: string
  state?: string
  page: number
}

export interface OngsRepository {
  findById(id: string): Promise<Ong | null>
  findByTitle(title: string): Promise<Ong | null>
  filter(data: FilterParams): Promise<Ong[]>
  create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
}
