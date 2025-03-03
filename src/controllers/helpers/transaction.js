import validator from 'validator'
import { badRequest } from './http.js'

export const checkIfAmountIsValid = (amount) => {
    return validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
}

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'O valor deve ser uma moeda válida',
    })
}

export const invalidTypeResponse = () => {
    return badRequest({
        message: 'O tipo deve ser EARNING, EXPENSE ou INVESTMENT',
    })
}
