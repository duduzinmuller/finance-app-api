import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    ok,
    notFound,
} from './helpers/index.js'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'

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
                return notFound({ message: 'Usuario não encontrado' })
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
