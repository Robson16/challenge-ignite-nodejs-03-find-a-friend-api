import { FakePetsRepository } from '@/repositories/fake/fake-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidRequestError } from './errors/invalid-request-error'
import { SearchPetService } from './search-pets'

let petsRepository: FakePetsRepository
let sut: SearchPetService // Subject Under Test

describe('Search ONG Service', () => {
  beforeEach(async () => {
    petsRepository = new FakePetsRepository()
    sut = new SearchPetService(petsRepository)

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
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
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
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Jundiaí',
      zip_code: '7777777',
      latitude: -23.2012036,
      longitude: -47.072474,
    })

    await petsRepository.create({
      ong_id: 'ongId-02',
      name: 'Poopsalot',
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
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Santana',
      zip_code: '7777777',
      latitude: -23.5006281,
      longitude: -46.6495985,
    })

    await petsRepository.create({
      ong_id: 'ongId-02',
      name: 'Purrsalot',
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
      address: 'Test Street, 777',
      state: 'SP',
      city: 'Santana',
      zip_code: '7777777',
      latitude: -23.5006281,
      longitude: -46.6495985,
    })
  })

  it('should be able to search for pets', async () => {
    const { pets } = await sut.execute({
      city: 'Jundiaí',
      state: 'SP',
      age: '3',
      energy_level: '3',
      independence_level: '4',
      size: 'small',
      type: 'CAT',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Meowsalot' })])
  })

  it('should be able to search for pets only by address', async () => {
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

  it('should be able to search for pets only with its properties', async () => {
    const { pets } = await sut.execute({
      size: 'small',
      page: 1,
    })

    expect(pets).toHaveLength(4)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Barksalot' }),
      expect.objectContaining({ name: 'Meowsalot' }),
      expect.objectContaining({ name: 'Poopsalot' }),
      expect.objectContaining({ name: 'Purrsalot' }),
    ])
  })

  it('should be able to fetch paginated pets search', async () => {
    petsRepository.items = []

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
        address: 'Test Street, 777',
        state: 'SP',
        city: 'Jundiaí',
        zip_code: '7777777',
        latitude: -23.2012036,
        longitude: -47.072474,
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

  it('should not be able to search for pets without any parameters', async () => {
    await expect(() =>
      sut.execute({
        page: 1,
      }),
    ).rejects.toBeInstanceOf(InvalidRequestError)
  })
})
