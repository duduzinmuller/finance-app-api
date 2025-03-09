import { notFound } from './http.js'

export const transactionNotFoundResponse = () => {
    return notFound({ message: 'Transação não encontrada.' })
}
