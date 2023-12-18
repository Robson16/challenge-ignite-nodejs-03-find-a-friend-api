import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

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

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ong_id: ong.id,
        name: 'Barksalot',
        about: 'test pet',
        age: '3',
        type: 'DOG',
        size: 'small',
        energy_level: '3',
        independence_level: '4',
        environment: 'Test environment text',
        requirements: [
          'Test requirement text 1',
          'Test requirement text 2',
          'Test requirement text 3',
        ],
        address: 'Test Street, 777',
        state: 'SP',
        city: 'Jundiaí',
        zip_code: 7777777,
        latitude: -23.4882062,
        longitude: -46.6192469,
      })

    expect(response.statusCode).toBe(201)
  })
})
