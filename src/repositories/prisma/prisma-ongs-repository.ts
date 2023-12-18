import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FilterParams, OngsRepository } from '../ongs-repository'

export class PrimaOngsRepository implements OngsRepository {
  async findById(id: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        id,
      },
    })

    return ong
  }

  async findByTitle(title: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        title,
      },
    })

    return ong
  }

  async filter({ title, city, state, page }: FilterParams) {
    const ongs = await prisma.ong.findMany({
      where: {
        title: {
          contains: title,
        },
        city: city !== '' ? city : undefined,
        state: state !== '' ? state : undefined,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return ongs
  }

  async create(data: Prisma.OngUncheckedCreateInput) {
    const ong = await prisma.ong.create({
      data,
    })

    return ong
  }
}
