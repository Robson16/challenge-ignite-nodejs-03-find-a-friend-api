import { Ong, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FilterParams, OngsRepository } from '../ongs-repository'

export class FakeOngsRepository implements OngsRepository {
  public items: Ong[] = []

  async findById(id: string) {
    const ong = this.items.find((item) => item.id === id)

    if (!ong) {
      return null
    }

    return ong
  }

  async findByTitle(title: string) {
    const ong = this.items.find((item) => item.title === title)

    if (!ong) {
      return null
    }

    return ong
  }

  async filter({ title, city, state, page }: FilterParams) {
    const ongs = this.items.filter((item) => {
      const titleMatch = !title || item.title.includes(title)
      const cityMatch = city === undefined || item.city === city
      const stateMatch = state === undefined || item.state === state

      return titleMatch && cityMatch && stateMatch
    })

    return ongs.slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.OngUncheckedCreateInput) {
    const ong = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      title: data.title,
      description: data.description ?? null,
      phone: data.phone,
      address: data.address,
      country: data.country ?? 'Brazil',
      state: data.state,
      city: data.city,
      zip_code: new Prisma.Decimal(data.zip_code.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(ong)

    return ong
  }
}
