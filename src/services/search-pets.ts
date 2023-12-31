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
  energy_level?: string
  independence_level?: string

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
    energy_level,
    independence_level,
    page,
  }: SearchPetServiceRequest): Promise<SearchPetServiceResponse> {
    const filters = omitBy(
      {
        city,
        state,
        age,
        type,
        size,
        energy_level,
        independence_level,
      },
      isNil,
    )

    if (isNil(filters) || isEmpty(filters)) {
      throw new InvalidRequestError()
    }

    const pets = await this.petsRepository.filter({
      filters,
      page,
    })

    return {
      pets,
    }
  }
}
