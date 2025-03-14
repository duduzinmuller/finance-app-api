import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma.js'
import { user as fakeUser } from '../../../tests/index.js'
import { PostgresUpdateUserRepository } from './update-user.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js'
import { UserNotFoundError } from '../../../errors/user.js'

const updateUserParams = {
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
}

describe('PostgresUpdateUserRepository', () => {
    it('should update user on db', async () => {
        const user = await prisma.user.create({ data: fakeUser })

        const sut = new PostgresUpdateUserRepository()

        const result = await sut.execute(user.id, updateUserParams)

        expect(result).toStrictEqual(updateUserParams)
    })

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({ data: fakeUser })

        const sut = new PostgresUpdateUserRepository()

        const prismaSpy = import.meta.jest.spyOn(prisma.user, 'update')

        await sut.execute(user.id, updateUserParams)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
            data: updateUserParams,
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new PostgresUpdateUserRepository()

        import.meta.jest
            .spyOn(prisma.user, 'update')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(updateUserParams)

        await expect(promise).rejects.toThrow()
    })

    it('should throw UserNotFoundError if Prisma does not find record to update', async () => {
        const sut = new PostgresUpdateUserRepository()
        import.meta.jest.spyOn(prisma.user, 'update').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', {
                code: 'P2025',
            }),
        )

        const promise = sut.execute(updateUserParams.id)

        await expect(promise).rejects.toThrow(
            new UserNotFoundError(updateUserParams.id),
        )
    })
})
