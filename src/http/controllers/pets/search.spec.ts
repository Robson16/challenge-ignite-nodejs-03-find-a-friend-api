import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a Pet', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    const ong = await prisma.ong.create({
      data: {
        user_id: user.id,
        title: 'Test ONG',
        description: '',
        phone: '+5511988887777',
        address: 'Test Street, 777',
        state: 'SP',
        city: 'Jundiaí',
        zip_code: 7777777,
        latitude: -23.4882062,
        longitude: -46.6192469,
      },
    })

    await prisma.pet.create({
      data: {
        ong_id: ong.id,
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
        zip_code: 7777777,
        latitude: -23.4882062,
        longitude: -46.6192469,
      },
    })

    await prisma.pet.create({
      data: {
        ong_id: ong.id,
        name: 'Poopsalot',
        about: 'test pet',
        age: '3',
        type: 'DOG',
        size: 'smaller',
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
        zip_code: 7777777,
        latitude: -23.4882062,
        longitude: -46.6192469,
      },
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'Jundiaí',
        state: 'SP',
        size: 'small',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Barksalot',
      }),
    ])
  })
})
