import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

interface CreateOngServiceRequest {
  userId: string
  title: string
  description: string | null
  phone: string
  address: string
  zipCode: string
  latitude: number
  longitude: number
}

interface CreateOngServiceResponse {
  ong: Ong
}

export class CreateOngService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    userId,
    title,
    description,
    phone,
    address,
    zipCode,
    latitude,
    longitude,
  }: CreateOngServiceRequest): Promise<CreateOngServiceResponse> {
    const ongTitleAlreadyInUse = await this.ongsRepository.findByTitle(title)

    if (ongTitleAlreadyInUse) {
      throw new OngAlreadyExistsError()
    }

    const ong = await this.ongsRepository.create({
      user_id: userId,
      title,
      description,
      phone,
      address,
      zip_code: zipCode,
      latitude,
      longitude,
    })

    return {
      ong,
    }
  }
}
