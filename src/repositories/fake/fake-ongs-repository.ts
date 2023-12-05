import { Ong, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OngsRepository } from '../ongs-repository'

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

  async create(data: Prisma.OngUncheckedCreateInput) {
    const ong = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      title: data.title,
      description: data.description ?? null,
      phone: data.phone,
      address: data.address,
      zip_code: new Prisma.Decimal(data.zip_code.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(ong)

    return ong
  }
}
