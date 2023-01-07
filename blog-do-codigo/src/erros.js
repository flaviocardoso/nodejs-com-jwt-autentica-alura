class InvalidArgumentError extends Error {
    const (msg) {
        super(msg)
        this.name = 'InvalidArgumentError'
    }
}
class InternalServerError extends Error {
    constructor (msg) {
        super (msg)
        this.name = 'InternalServerError'
    }
}
module.exports = {
    InternalServerError,
    InvalidArgumentError
}