import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z
        .string({
            required_error: 'O primeiro nome é obrigatório',
        })
        .trim()
        .min(1, {
            message: 'O primeiro nome é obrigatório',
        }),
    last_name: z
        .string({
            required_error: 'O último nome é obrigatório',
        })
        .trim()
        .min(1, {
            message: 'O último nome é obrigatório',
        }),
    email: z
        .string({
            required_error: 'O email é obrigatório',
        })
        .email({
            message: 'O email é inválido',
        })
        .trim()
        .min(1, {
            message: 'O email é obrigatório',
        }),
    password: z
        .string({
            required_error: 'A senha é obrigatória',
        })
        .trim(1, {
            message: 'A senha é obrigatória',
        })
        .min(6, {
            message: 'A senha deve ter no mínimo 6 caracteres',
        }),
})

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Os campos não podem ser adicionados',
})
