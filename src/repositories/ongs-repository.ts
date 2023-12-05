import { Prisma, Ong } from '@prisma/client'

export interface OngsRepository {
  findById(id: string): Promise<Ong | null>
  findByTitle(title: string): Promise<Ong | null>
  create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
}
