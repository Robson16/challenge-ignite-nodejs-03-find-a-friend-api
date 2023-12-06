import { FakeOngsRepository } from '@/repositories/fake/fake-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindOngService } from './find-ong'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let ongsRepository: FakeOngsRepository
let sut: FindOngService // Subject Under Test

describe('Search ONG Service', () => {
  beforeEach(() => {
    ongsRepository = new FakeOngsRepository()
    sut = new FindOngService(ongsRepository)
  })

  it('should be able to find a ONG by exact title', async () => {
    const title = 'Test Ong'

    await ongsRepository.create({
      user_id: 'userId-01',
      title,
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.4882062,
      longitude: -46.6192469,
    })

    const { ong } = await sut.execute({ title })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should not be able to find a nonexistent ONG by title', async () => {
    await expect(() =>
      sut.execute({ title: 'non-existent-ong' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
