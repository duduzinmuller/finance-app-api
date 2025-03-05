import { badRequest, notFound } from './http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'A senha deve ter no minímo 6 caracteres.',
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({ message: 'Email invalído.' })

export const userNotFoundResponse = () =>
    notFound({ message: 'Usuario não encontrado.' })
