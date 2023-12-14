import { FakeOngsRepository } from '@/repositories/fake/fake-ongs-repository'
import { FakeUsersRepository } from '@/repositories/fake/fake-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOngService } from './create-ong'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: FakeUsersRepository
let ongsRepository: FakeOngsRepository
let sut: CreateOngService // Subject Under Test

describe('Create ONG Service', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    ongsRepository = new FakeOngsRepository()
    sut = new CreateOngService(usersRepository, ongsRepository)
  })

  it('should be able to create a ONG', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
    })

    const { ong } = await sut.execute({
      userId: user.id,
      title: 'Test ONG',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zipCode: 7777777,
      latitude: -23.4882062,
      longitude: -46.6192469,
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should be not able to create a ONG without a user associated', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-user-id',
        title: 'Test ONG',
        phone: '+5511988887777',
        address: 'Test Street, 777',
        state: 'SP',
        city: 'Jundiaí',
        zipCode: 7777777,
        latitude: -23.4882062,
        longitude: -46.6192469,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create duplicate ONG', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      userId: user.id,
      title: 'Test ONG',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zipCode: 7777777,
      latitude: -23.4882062,
      longitude: -46.6192469,
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        title: 'Test ONG',
        phone: '+5511988887777',
        address: 'Test Street, 777',
        state: 'SP',
        city: 'Jundiaí',
        zipCode: 7777777,
        latitude: -23.4882062,
        longitude: -46.6192469,
      }),
    ).rejects.toBeInstanceOf(OngAlreadyExistsError)
  })
})
