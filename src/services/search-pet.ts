import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetServiceRequest {
  city: string
  state: string
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
    page,
  }: SearchPetServiceRequest): Promise<SearchPetServiceResponse> {
    const ongs = await this.ongsRepository.searchMany({ city, state, page: -1 })

    const ongsId = ongs.map((ong) => ong.id)

    const pets = await this.petsRepository.searchMany({ ongsId, page })

    return {
      pets,
    }
  }
}
