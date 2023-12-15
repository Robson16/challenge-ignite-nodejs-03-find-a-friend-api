import { OngsRepository } from '@/repositories/ongs-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Ong } from '@prisma/client'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateOngServiceRequest {
  userId: string
  title: string
  description?: string | null
  phone: string
  address: string
  country?: string
  state: string
  city: string
  zip_code: number
  latitude: number
  longitude: number
}

interface CreateOngServiceResponse {
  ong: Ong
}

export class CreateOngService {
  constructor(
    private usersRepository: UsersRepository,
    private ongsRepository: OngsRepository,
  ) {}

  async execute({
    userId,
    title,
    description,
    phone,
    address,
    country,
    state,
    city,
    zip_code,
    latitude,
    longitude,
  }: CreateOngServiceRequest): Promise<CreateOngServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

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
      country,
      state,
      city,
      zip_code,
      latitude,
      longitude,
    })

    return {
      ong,
    }
  }
}
