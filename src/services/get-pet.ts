import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetServiceRequest {
  petId: string
}

interface GetPetServiceResponse {
  pet: Pet
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetServiceRequest): Promise<GetPetServiceResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
