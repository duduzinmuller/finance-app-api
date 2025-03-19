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

export const updateUserSchema = createUserSchema
    .omit({
        user_id: true,
    })
    .partial()
    .strict({
        message: 'Os campos não podem ser adicionados',
    })

export const loginSchema = z.object({
    email: z
        .string()
        .email({
            message: 'O email é inválido',
        })
        .trim()
        .min(1, {
            message: 'O email é obrigatório',
        }),
    password: z.string().trim().min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
    }),
})

export const refreshTokenSchema = z.object({
    refreshToken: z.string().trim().min(1, {
        message: 'O token de refresh é obrigatório',
    }),
})

export const getUserBalanceSchema = z.object({
    user_id: z.string().uuid(),
    from: z.string().date(),
    to: z.string().date(),
})
