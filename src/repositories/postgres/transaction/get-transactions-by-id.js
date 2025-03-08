import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetTransactionByIdRepository {
    async execute(transactionId) {
        return await prisma.transaction.findMany({
            where: {
                id: transactionId,
            },
        })
    }
}
