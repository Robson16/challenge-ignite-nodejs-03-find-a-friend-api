import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { isEmpty, isNil, omitBy } from 'lodash'
import { InvalidRequestError } from './errors/invalid-request-error'

interface SearchPetServiceRequest {
  city?: string
  state?: string
  age?: string
  type?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string

  page: number
}

interface SearchPetServiceResponse {
  pets: Pet[]
}

export class SearchPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
    age,
    type,
    size,
    energyLevel,
    independenceLevel,
    page,
  }: SearchPetServiceRequest): Promise<SearchPetServiceResponse> {
    const filters = omitBy(
      {
        city,
        state,
        age,
        type,
        size,
        energyLevel,
        independenceLevel,
      },
      isNil,
    )

    if (isNil(filters) || isEmpty(filters)) {
      throw new InvalidRequestError()
    }

    const pets = await this.petsRepository.searchMany({
      filters,
      page,
    })

    return {
      pets,
    }
  }
}
