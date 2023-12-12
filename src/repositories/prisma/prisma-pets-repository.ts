import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, SearchManyParams } from '../pets-repository'

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

  async searchMany({ filters, page }: SearchManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: filters.city,
        state: filters.state,
        type:
          filters.type === 'DOG' || filters.type === 'CAT'
            ? filters.type
            : undefined,
        age: filters.age,
        size: filters.size,
        energy_level: filters.energyLevel,
        independence_level: filters.independenceLevel,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
