import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOngServiceRequest {
  ongId: string
}

interface GetOngServiceResponse {
  ong: Ong
}

export class GetOngService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    ongId,
  }: GetOngServiceRequest): Promise<GetOngServiceResponse> {
    const ong = await this.ongsRepository.findById(ongId)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    return {
      ong,
    }
  }
}
