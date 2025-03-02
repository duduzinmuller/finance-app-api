import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    userNotFoundResponse,
} from './helpers/index.js'
import { GetUserByIdUseCase } from '../use-cases/index.js'

export class GetUserByIdController {
    constructor() {
        this.getuserByIdUseCase = new GetUserByIdUseCase()
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }
            const user = await this.getuserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
