class InvalidArgumentError extends Error {
    constructor (msg) {
        super(msg)
        this.name = 'InvalidArgumentError'
    }
}
class InternalServerError extends Error {
    constructor (msg) {
        super(msg)
        this.name = 'InternalServerError'
    }
}
class ExpirationError extends Error {
    constructor (msg) {
        super(msg)
        this.name = 'ExpirationError'
    }
}
module.exports = {
    InternalServerError,
    InvalidArgumentError,
    ExpirationError
}