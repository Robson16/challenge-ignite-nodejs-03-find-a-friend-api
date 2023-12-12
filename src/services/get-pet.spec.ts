import { FakePetsRepository } from '@/repositories/fake/fake-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetService } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: FakePetsRepository
let sut: GetPetService // Subject Under Test

describe('Get Pet Service', () => {
  beforeEach(() => {
    petsRepository = new FakePetsRepository()
    sut = new GetPetService(petsRepository)
  })

  it('should be able to get a pet', async () => {
    const createdPet = await petsRepository.create({
      ong_id: 'ong-test-id',
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

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Barksalot')
  })

  it('should not be able to get a pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
