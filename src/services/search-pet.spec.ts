import { FakeOngsRepository } from '@/repositories/fake/fake-ongs-repository'
import { FakePetsRepository } from '@/repositories/fake/fake-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetService } from './search-pet'

let ongsRepository: FakeOngsRepository
let petsRepository: FakePetsRepository
let sut: SearchPetService // Subject Under Test

describe('Search ONG Service', () => {
  beforeEach(async () => {
    ongsRepository = new FakeOngsRepository()
    petsRepository = new FakePetsRepository()
    sut = new SearchPetService(ongsRepository, petsRepository)

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
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      ong_id: 'ongId-01',
      name: 'Barksalot',
      about: 'test pet',
      age: '3',
      type: 'DOG',
      size: 'small',
      energy_level: '3',
      independence_level: '4',
      environment: 'Test environment text',
      requirements: JSON.stringify([
        'Test requirement text 1',
        'Test requirement text 2',
        'Test requirement text 3',
      ]),
    })

    await petsRepository.create({
      ong_id: 'ongId-01',
      name: 'Meowsalot',
      about: 'test pet',
      age: '3',
      type: 'CAT',
      size: 'small',
      energy_level: '3',
      independence_level: '4',
      environment: 'Test environment text',
      requirements: JSON.stringify([
        'Test requirement text 1',
        'Test requirement text 2',
        'Test requirement text 3',
      ]),
    })

    const { pets } = await sut.execute({
      city: 'Jundiaí',
      state: 'SP',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Barksalot' }),
      expect.objectContaining({ name: 'Meowsalot' }),
    ])
  })

  it('should be able to fetch paginated pets search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        ong_id: 'ongId-01',
        name: `Meowsalot ${i}`,
        about: 'test pet',
        age: '3',
        type: 'CAT',
        size: 'small',
        energy_level: '3',
        independence_level: '4',
        environment: 'Test environment text',
        requirements: JSON.stringify([
          'Test requirement text 1',
          'Test requirement text 2',
          'Test requirement text 3',
        ]),
      })
    }

    const { pets } = await sut.execute({
      city: 'Jundiaí',
      state: 'SP',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Meowsalot 21' }),
      expect.objectContaining({ name: 'Meowsalot 22' }),
    ])
  })
})
