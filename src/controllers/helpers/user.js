import { notFound } from './http.js'

export const userNotFoundResponse = () =>
    notFound({ message: 'Usuario não encontrado.' })
