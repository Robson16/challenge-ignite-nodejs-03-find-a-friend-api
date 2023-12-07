import { FakeOngsRepository } from '@/repositories/fake/fake-ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchOngsService } from './search-ongs'
import { InvalidRequestError } from './errors/invalid-request-error'

let ongsRepository: FakeOngsRepository
let sut: SearchOngsService // Subject Under Test

describe('Search ONG Service', () => {
  beforeEach(async () => {
    ongsRepository = new FakeOngsRepository()
    sut = new SearchOngsService(ongsRepository)
  })

  it('should be able to search for ongs only by city and state', async () => {
    await ongsRepository.create({
      id: 'ongId-01',
      user_id: 'userId-01',
      title: 'ong-test-01',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
    })

    await ongsRepository.create({
      id: 'ongId-02',
      user_id: 'userId-02',
      title: 'ong-test-02',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
    })

    const { ongs } = await sut.execute({
      city: 'Jundiaí',
      state: 'SP',
      page: 1,
    })

    expect(ongs).toHaveLength(2)
    expect(ongs).toEqual([
      expect.objectContaining({ title: 'ong-test-01' }),
      expect.objectContaining({ title: 'ong-test-02' }),
    ])
  })

  it('should be able to search for ongs only by title', async () => {
    await ongsRepository.create({
      id: 'ongId-01',
      user_id: 'userId-01',
      title: 'ong-test-01',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
    })

    await ongsRepository.create({
      id: 'ongId-02',
      user_id: 'userId-02',
      title: 'ong-test-02',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
    })

    const { ongs } = await sut.execute({
      title: 'ong-test-01',
      page: 1,
    })

    expect(ongs).toHaveLength(1)
    expect(ongs).toEqual([expect.objectContaining({ title: 'ong-test-01' })])
  })

  it('should be able to search for ongs by title, city and state', async () => {
    await ongsRepository.create({
      id: 'ongId-01',
      user_id: 'userId-01',
      title: 'ong-test-01',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
    })

    await ongsRepository.create({
      id: 'ongId-02',
      user_id: 'userId-02',
      title: 'ong-test-02',
      phone: '+5511988887777',
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
    })

    const { ongs } = await sut.execute({
      title: 'ong-test-02',
      city: 'Jundiaí',
      state: 'SP',
      page: 1,
    })

    expect(ongs).toHaveLength(1)
    expect(ongs).toEqual([expect.objectContaining({ title: 'ong-test-02' })])
  })

  it('should not be able to search without any parameter', async () => {
    await expect(() =>
      sut.execute({
        page: 1,
      }),
    ).rejects.toBeInstanceOf(InvalidRequestError)
  })
})
