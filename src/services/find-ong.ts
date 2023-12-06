import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindOngServiceRequest {
  title: string
}

interface FindOngServiceResponse {
  ong: Ong
}

export class FindOngService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    title,
  }: FindOngServiceRequest): Promise<FindOngServiceResponse> {
    const ong = await this.ongsRepository.findByTitle(title)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    return {
      ong,
    }
  }
}
