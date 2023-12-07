import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import { InvalidRequestError } from './errors/invalid-request-error'

interface SearchOngsServiceRequest {
  title?: string
  city?: string
  state?: string
  page: number
}

interface SearchOngsServiceResponse {
  ongs: Ong[]
}

export class SearchOngsService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    title,
    city,
    state,
    page,
  }: SearchOngsServiceRequest): Promise<SearchOngsServiceResponse> {
    if (title === undefined && city === undefined && state === undefined) {
      throw new InvalidRequestError()
    }

    const ongs = await this.ongsRepository.filter({ title, city, state, page })

    return {
      ongs,
    }
  }
}
