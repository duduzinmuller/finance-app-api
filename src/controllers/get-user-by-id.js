import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError, ok, notFound } from './helpers/http.js'
import validator from 'validator'
import { invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    constructor() {
        this.getuserByIdUseCase = new GetUserByIdUseCase()
    }
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }
            const user = await this.getuserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({ message: 'Usuario não encontrado' })
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
