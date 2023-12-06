import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository, SearchManyParams } from '../pets-repository'

export class FakePetsRepository implements PetsRepository {
  public items: Pet[] = []

  async searchMany({ ongsId, page }: SearchManyParams) {
    return this.items
      .filter((item) => ongsId.some((ongId) => item.ong_id.includes(ongId)))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      ong_id: data.ong_id,
      name: data.name,
      about: data.about,
      age: data.age,
      type: data.type,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      requirements: data.requirements,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
