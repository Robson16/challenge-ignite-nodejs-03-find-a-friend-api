import { FakeOngsRepository } from '@/repositories/fake/fake-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOngService } from './create-ong'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

let ongsRepository: FakeOngsRepository
let sut: CreateOngService // Subject Under Test

describe('Create ONG Service', () => {
  beforeEach(() => {
    ongsRepository = new FakeOngsRepository()
    sut = new CreateOngService(ongsRepository)
  })

  it('should be able to create a ONG', async () => {
    const { ong } = await sut.execute({
      userId: 'userId-01',
      title: 'Test ONG',
      description: null,
      phone: '+5511988887777',
      address: 'Test Streat, 777',
      zipCode: '7777777',
      latitude: -23.4882062,
      longitude: -46.6192469,
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should not be able to create duplicate ONG', async () => {
    await sut.execute({
      userId: 'userId-01',
      title: 'Test ONG',
      description: null,
      phone: '+5511988887777',
      address: 'Test Streat, 777',
      zipCode: '7777777',
      latitude: -23.4882062,
      longitude: -46.6192469,
    })

    await expect(() =>
      sut.execute({
        userId: 'userId-01',
        title: 'Test ONG',
        description: null,
        phone: '+5511988887777',
        address: 'Test Streat, 777',
        zipCode: '7777777',
        latitude: -23.4882062,
        longitude: -46.6192469,
      }),
    ).rejects.toBeInstanceOf(OngAlreadyExistsError)
  })
})
