import { badRequest } from './http.js'

import validator from 'validator'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
    badRequest({ message: 'Este ID e invalído.' })

export const requiredFieldsIsMissingResponse = (field) =>
    badRequest({ message: `O campo ${field} e obrigatório.` })
