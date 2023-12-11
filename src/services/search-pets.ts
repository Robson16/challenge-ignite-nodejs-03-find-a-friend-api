import { OngsRepository } from '@/repositories/ongs-repository'
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
  constructor(
    private ongsRepository: OngsRepository,
    private petsRepository: PetsRepository,
  ) {}

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
    const params = omitBy(
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

    if (isNil(params) || isEmpty(params)) {
      throw new InvalidRequestError()
    }

    const ongs = await this.ongsRepository.filter({ city, state, page: -1 })

    const ongsId = ongs.map((ong) => ong.id)

    const pets = await this.petsRepository.searchMany({
      ongsId,
      age,
      type,
      size,
      energyLevel,
      independenceLevel,
      page,
    })

    return {
      pets,
    }
  }
}
