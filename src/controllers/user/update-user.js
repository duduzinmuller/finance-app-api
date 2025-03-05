import { UpdateUserUseCase } from '../../use-cases/index.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
} from '../helpers/index.js'
import { updateUserSchema } from '../../schemas/user.js'
import { ZodError } from 'zod'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            await updateUserSchema.parseAsync(params)

            const updateUserUseCase = new UpdateUserUseCase()

            const updatedUser = await updateUserUseCase.execute(userId, params)

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
