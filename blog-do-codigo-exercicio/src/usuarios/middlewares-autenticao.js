const passport = require('passport')

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false },
            (error, usuario, info) => {
                if (error && error.name === 'InvalidArgumentError') {
                    res.status(401).json({ erro: error.message })
                    return
                }
                if (error) {
                    res.status(500).json({ erro: error.message })
                    return
                }
                if (!usuario) {
                    res.status(401).end()
                    return
                }
                req.user = usuario
                next()
            }
        )(req, res, next)
    },
    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false },
            (error, usuario, info) => {
                if (error && error.name === 'JsonWebTokenError') {
                    res.status(401).json({ erro: error.message })
                    return
                }
                if (error && error.name === 'ExpirationError') {
                    res.status(401).json({ erro: error.message })
                    return
                }
                if (error && error.name === 'TokenExpiredError') {
                    res.status(401).json({ erro: error.message, expiradoEm: error.expiredAt })
                    return
                }
                if (error) {
                    res.status(500).json({ erro: error.message })
                    return
                }
                if (!usuario) {
                    res.status(401).end()
                    return
                }
                req.token = info.token
                req.user = usuario
                next()
            }
        )(req, res, next)
    }
}