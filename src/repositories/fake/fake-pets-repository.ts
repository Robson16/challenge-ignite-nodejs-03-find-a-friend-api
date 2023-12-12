import { Pet, Prisma } from '@prisma/client'
import { filter, isNil, matches, omitBy } from 'lodash'
import { randomUUID } from 'node:crypto'
import { PetsRepository, SearchManyParams } from '../pets-repository'

export class FakePetsRepository implements PetsRepository {
  public items: Pet[] = []

  async searchMany({ filters, page }: SearchManyParams) {
    const notNilFilters = omitBy(
      {
        city: filters.city,
        state: filters.state,
        age: filters.age,
        type: filters.type,
        size: filters.size,
        energy_level: filters.energyLevel,
        independence_level: filters.independenceLevel,
      },
      isNil,
    )

    const pets = filter(this.items, matches(notNilFilters))

    return pets.slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
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
      address: data.address,
      country: data.country ?? 'Brazil',
      state: data.state,
      city: data.city,
      zip_code: new Prisma.Decimal(data.zip_code.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
