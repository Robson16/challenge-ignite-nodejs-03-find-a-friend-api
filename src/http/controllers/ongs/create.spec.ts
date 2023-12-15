import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create ONG Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a ONG', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/ongs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test ONG',
        description: '',
        phone: '+5511988887777',
        address: 'Test Street, 777',
        state: 'SP',
        city: 'Jundiaí',
        zipCode: 7777777,
        latitude: -23.4882062,
        longitude: -46.6192469,
      })

    expect(response.statusCode).toBe(201)
  })
})
