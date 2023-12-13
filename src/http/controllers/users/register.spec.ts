import { app } from '@/app'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register Controller (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
