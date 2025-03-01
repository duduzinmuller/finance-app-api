import validator from 'validator'
import { badRequest, ok, serverError } from './helpers.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserController {
    constructor() {
        this.updateUserUseCase = new UpdateUserUseCase()
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return badRequest({ message: 'Este ID e invalído.' })
            }

            const updateUserParams = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldsNotAllowed) {
                return badRequest({
                    message: `Algum campo fornecido não é permitido.`,
                })
            }

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6

                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'A senha deve ter no minímo 6 caracteres.',
                    })
                }
            }

            if (updateUserParams.email) {
                const validIsEmail = validator.isEmail(updateUserParams.email)

                if (!validIsEmail) {
                    return badRequest({ message: 'Email invalído.' })
                }
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
