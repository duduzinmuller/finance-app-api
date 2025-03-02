import { badRequest } from './http.js'
import validator from 'validator'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'A senha deve ter no minímo 6 caracteres.',
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({ message: 'Email invalído.' })

export const invalidIdResponse = () =>
    badRequest({ message: 'Este ID e invalído.' })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfIdIsValid = (id) => validator.isUUID(id)
