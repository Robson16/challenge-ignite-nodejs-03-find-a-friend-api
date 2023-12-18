import { FakeOngsRepository } from '@/repositories/fake/fake-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetOngService } from './get-ong'

let ongsRepository: FakeOngsRepository
let sut: GetOngService // Subject Under Test

describe('Get ONG Service', () => {
  beforeEach(() => {
    ongsRepository = new FakeOngsRepository()
    sut = new GetOngService(ongsRepository)
  })

  it('should be able to get a ONG', async () => {
    const createdOng = await ongsRepository.create({
      user_id: 'userId-01',
      title: 'Test Ong',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: 7777777,
      latitude: -23.4882062,
      longitude: -46.6192469,
    })

    const { ong } = await sut.execute({ ongId: createdOng.id })

    expect(ong.title).toEqual('Test Ong')
  })

  it('should not be able to get a nonexistent ONG', async () => {
    await expect(() =>
      sut.execute({ ongId: 'non-existent-ong' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
