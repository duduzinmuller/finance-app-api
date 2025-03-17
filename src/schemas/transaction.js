import { z } from 'zod'
import validator from 'validator'

export const createTransactionSchema = z.object({
    user_id: z
        .string({
            required_error: 'O id do usuário é obrigatório',
        })
        .uuid({
            message: 'Este id de usuário não é válido',
        }),
    name: z
        .string({
            required_error: 'O nome da transação é obrigatório',
        })
        .trim()
        .min(1, {
            message: 'O nome da transação é obrigatório',
        }),
    date: z
        .string({
            required_error: 'A data da transação é obrigatória',
        })
        .datetime({
            message: 'A data deve ser uma data válida',
        }),
    type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT'], {
        errorMap: () => ({
            message:
                "O tipo da transação deve ser 'EXPENSE', 'EARNING' ou 'INVESTMENT'",
        }),
    }),
    amount: z
        .number({
            required_error: 'O valor da transação é obrigatório',
            invalid_type_error: 'O valor deve ser um número',
        })
        .min(1, {
            message: 'O valor deve ser uma moeda válida',
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            }),
        ),
})

export const updateTransactionSchema = createTransactionSchema
    .omit({
        user_id: true,
    })
    .partial()

export const getTransactionsByUserIdSchema = z.object({
    user_id: z.string().uuid(),
    from: z.string().date(),
    to: z.string().date(),
})
