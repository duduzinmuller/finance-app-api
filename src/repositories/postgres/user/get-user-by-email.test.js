import { prisma } from '../../../../prisma/prisma.js'
import { user as fakeUser } from '../../../tests/index.js'
import { PostgresGetUserByEmailRepository } from './get-user-by-email.js'

describe('GetUserByEmailRepository', () => {
    it('should get user by email on db', async () => {
        const user = await prisma.user.create({ data: fakeUser })

        const sut = new PostgresGetUserByEmailRepository()

        const result = await sut.execute(user.email)

        expect(result).toStrictEqual(user)
    })
})
