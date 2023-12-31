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
  energy_level: string
  independence_level: string
  environment: string
  requirements: string[]
  address: string
  country?: string
  state: string
  city: string
  zip_code: number
  latitude: number
  longitude: number
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
    energy_level,
    independence_level,
    environment,
    requirements,
    address,
    country,
    state,
    city,
    zip_code,
    latitude,
    longitude,
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
      energy_level,
      independence_level,
      environment,
      requirements: JSON.stringify(requirements),
      address,
      country,
      state,
      city,
      zip_code,
      latitude,
      longitude,
    })

    return {
      pet,
    }
  }
}
