import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search ONG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a ONG', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    await prisma.ong.create({
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
      .get('/ongs/search')
      .query({
        title: 'Test',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.ongs).toHaveLength(1)
    expect(response.body.ongs).toEqual([
      expect.objectContaining({
        title: 'Test ONG',
      }),
    ])
  })
})
