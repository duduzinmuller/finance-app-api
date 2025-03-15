export const badRequest = (body) => ({
    statusCode: 400,
    body,
})

export const created = (body) => ({
    statusCode: 201,
    body,
})

export const serverError = () => ({
    statusCode: 500,
    body: {
        message: 'Erro interno no servidor',
    },
})

export const ok = (body) => ({
    statusCode: 200,
    body,
})

export const unauthorized = () => ({
    statusCode: 401,
    body: {
        message: 'Unauthorized',
    },
})

export const notFound = (body) => ({
    statusCode: 404,
    body,
})
