import { badRequest } from './http.js'

import validator from 'validator'

export const invalidIdResponse = () =>
    badRequest({ message: 'Este ID e invalído.' })

export const checkIfIdIsValid = (id) => validator.isUUID(id)
