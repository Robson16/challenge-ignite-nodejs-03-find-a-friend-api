import { Prisma, Ong } from '@prisma/client'

export interface OngsRepository {
  findByTitle(title: string): Promise<Ong | null>
  create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
}
