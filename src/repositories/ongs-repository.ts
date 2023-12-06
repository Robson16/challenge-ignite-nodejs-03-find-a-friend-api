import { Prisma, Ong } from '@prisma/client'

export interface SearchManyParams {
  city: string
  state: string
  page: number
}

export interface OngsRepository {
  findById(id: string): Promise<Ong | null>
  findByTitle(title: string): Promise<Ong | null>
  searchMany(data: SearchManyParams): Promise<Ong[]>
  create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
}
