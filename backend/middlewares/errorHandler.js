export const errorHandler = (err, req, res, next) => {
    const stack = err?.stack
    const statusCode = err?.statusCode
    const message = err?.message
    res.status(statusCode || 500).json({
        stack,
        message
    })
}

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}