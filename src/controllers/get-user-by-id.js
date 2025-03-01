import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError, ok, badRequest } from './helpers.js'
import validator from 'validator'

export class GetUserByIdController {
    constructor() {
        this.getuserByIdUseCase = new GetUserByIdUseCase()
    }
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({ message: 'Este ID e invalido' })
            }
            const user = await this.getuserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
