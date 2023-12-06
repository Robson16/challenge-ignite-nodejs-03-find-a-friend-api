import { FakeOngsRepository } from '@/repositories/fake/fake-ongs-repository'
import { FakePetsRepository } from '@/repositories/fake/fake-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let ongsRepository: FakeOngsRepository
let petsRepository: FakePetsRepository
let sut: CreatePetService // Subject Under Test

describe('Create Pet Service', () => {
  beforeEach(() => {
    ongsRepository = new FakeOngsRepository()
    petsRepository = new FakePetsRepository()
    sut = new CreatePetService(ongsRepository, petsRepository)
  })

  it('should be able to create a pet', async () => {
    const ong = await ongsRepository.create({
      user_id: 'userId-01',
      title: 'Test ONG',
      description: null,
      phone: '+5511988887777',
      address: 'Test Street, 777',
      zip_code: '7777777',
      latitude: -23.4882062,
      longitude: -46.6192469,
    })

    const { pet } = await sut.execute({
      ongId: ong.id,
      name: 'Barksalot',
      about: 'test pet',
      age: '3',
      type: 'DOG',
      size: 'small',
      energyLevel: '3',
      independenceLevel: '4',
      environment: 'Test environment text',
      requirements: [
        'Test requirement text 1',
        'Test requirement text 2',
        'Test requirement text 3',
      ],
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet without a ONG', async () => {
    await expect(() =>
      sut.execute({
        ongId: 'non-existing-ong',
        name: 'Barksalot',
        about: 'test pet',
        age: '3',
        type: 'DOG',
        size: 'small',
        energyLevel: '3',
        independenceLevel: '4',
        environment: 'Test environment text',
        requirements: [
          'Test requirement text 1',
          'Test requirement text 2',
          'Test requirement text 3',
        ],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
