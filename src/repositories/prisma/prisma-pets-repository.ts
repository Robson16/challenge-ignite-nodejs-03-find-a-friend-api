import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, FilterParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async filter({ filters, page }: FilterParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: filters.city !== '' ? filters.city : undefined,
        state: filters.state !== '' ? filters.state : undefined,
        type:
          filters.type === 'DOG' || filters.type === 'CAT'
            ? filters.type
            : undefined,
        age: filters.age !== '' ? filters.age : undefined,
        size: filters.size !== '' ? filters.size : undefined,
        energy_level:
          filters.energy_level !== '' ? filters.energy_level : undefined,
        independence_level:
          filters.independence_level !== ''
            ? filters.independence_level
            : undefined,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
