import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetServiceRequest {
  ongId: string
  name: string
  about: string
  age: string
  type: 'DOG' | 'CAT'
  size: string
  energyLevel: string
  independenceLevel: string
  environment: string
  requirements: string[]
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private ongsRepository: OngsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    ongId,
    name,
    about,
    age,
    type,
    size,
    energyLevel,
    independenceLevel,
    environment,
    requirements,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const ong = await this.ongsRepository.findById(ongId)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      ong_id: ongId,
      name,
      about,
      age,
      type,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      environment,
      requirements: JSON.stringify(requirements),
    })

    return {
      pet,
    }
  }
}
