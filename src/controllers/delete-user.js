import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    ok,
    serverError,
} from './helpers/index.js'
import { DeleteUserUseCase } from '../use-cases/index.js'

export class DeleteUserController {
    constructor() {
        this.deleteUserUseCase = new DeleteUserUseCase()
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return notFound({ message: 'Usuario não encontrado.' })
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
