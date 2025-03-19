import request from 'supertest'
import { app } from '../app.js'
import { faker } from '@faker-js/faker'
import { user } from '../tests/index.js'
import { TransactionType } from '@prisma/client'

describe('User Routes E2E Tests', () => {
    const from = '2025-03-18'
    const to = '2025-03-19'

    it('POST /api/users should return 201 when user is created', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                id: undefined,
                ...user,
            })

        expect(response.status).toBe(201)
    })

    it('GET /api/users/ should return 200 when user is found', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                id: undefined,
                ...user,
            })

        const response = await request(app)
            .get(`/api/users`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(createdUser.id)
    })

    it('PATCH /api/users/ should return 200 when user is updated', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const updateUserParams = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        const response = await request(app)
            .patch(`/api/users`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send(updateUserParams)

        expect(response.status).toBe(200)
        expect(response.body.first_name).toBe(updateUserParams.first_name)
        expect(response.body.last_name).toBe(updateUserParams.last_name)
        expect(response.body.email).toBe(updateUserParams.email)
        expect(response.body.password).not.toBe(createdUser.password)
    })

    it('DELETE /api/users should return 200 when user is deleted', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                id: undefined,
                ...user,
            })

        const response = await request(app)
            .delete(`/api/users`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body.id).toBe(createdUser.id)
    })

    it('GET /api/users/balance should return 200 and correct balance', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                id: undefined,
                ...user,
            })

        await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                user_id: createdUser.id,
                name: faker.commerce.productName(),
                date: new Date(from),
                type: TransactionType.EARNING,
                amount: 10000,
            })

        await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                user_id: createdUser.id,
                name: faker.commerce.productName(),
                date: new Date(from),
                type: TransactionType.EXPENSE,
                amount: 2000,
            })

        await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)
            .send({
                user_id: createdUser.id,
                name: faker.commerce.productName(),
                date: new Date(from),
                type: TransactionType.INVESTMENT,
                amount: 2000,
            })

        const response = await request(app)
            .get(`/api/users/balance?from=${from}&to=${to}`)
            .set('Authorization', `Bearer ${createdUser.tokens.accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            ganhos: '10000',
            despesas: '2000',
            investimentos: '2000',
            saldo: '6000',
        })
    })

    it('POST /api/users should return 400 when the provided email is already in use', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                id: undefined,
                ...user,
            })

        const response = await request(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
                email: createdUser.email,
            })

        expect(response.status).toBe(400)
    })

    it('POST /api/users/login should return 200 and tokens when user credentials are valid', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                id: undefined,
                ...user,
            })

        const response = await request(app).post('/api/users/login').send({
            email: createdUser.email,
            password: user.password,
        })

        expect(response.status).toBe(200)
        expect(response.body.tokens.accessToken).toBeDefined()
        expect(response.body.tokens.refreshToken).toBeDefined()
    })

    it('POST /api/users/refresh-token should return 200 and new tokens when refresh token is valid', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        const response = await request(app)
            .post('/api/users/refresh-token')
            .send({
                refreshToken: createdUser.tokens.refreshToken,
            })

        expect(response.status).toBe(200)
        expect(response.body.accessToken).toBeDefined()
        expect(response.body.refreshToken).toBeDefined()
    })
})
