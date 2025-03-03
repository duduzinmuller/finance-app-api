import { badRequest } from './http.js'

import validator from 'validator'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
    badRequest({ message: 'Este ID e invalído.' })

export const requiredFieldsIsMissingResponse = (field) =>
    badRequest({ message: `O campo ${field} e obrigatório.` })

export const checkIfIsString = (value) => typeof value === 'string'

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field]
        const fieldIsEmptyString =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            })

        if (fieldIsMissing || fieldIsEmptyString) {
            return {
                missingField: field,
                ok: false,
            }
        }
    }

    return {
        ok: true,
        missingField: undefined,
    }
}
