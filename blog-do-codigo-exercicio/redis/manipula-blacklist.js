const blacklist = require('./blacklist')

// const { promisify } = require('util')
//promisify(blacklist.exists.bind(blacklist))
//promisify(blacklist.set.bind(blacklist))
const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

const existsAsync = (valor) => new Promise((resolve, reject) => {
    try {
        const d = blacklist.exists(valor)
        resolve(d)
    } catch (error) {
        reject(error)
    }
})
const setAsync = (valor) => new Promise((resolve, reject) => {
    try {
        const d = blacklist.set(valor)
        resolve(d)
    } catch (error) {
        reject(error)
    }
})

function geraTokenHash (token) {
    return createHash('sha256').update(token).digest('hex')
}

module.exports = {
    adiciona: async token => {
        const dataExpiration = jwt.decode(token).exp
        console.log(dataExpiration)
        const tokenHash = geraTokenHash(token)
        await setAsync(tokenHash, '')
        blacklist.expireAt(tokenHash, dataExpiration)
    },
    contemToken: async token => {
        const tokenHash = geraTokenHash(token)
        // console.log(tokenHash)
        const resultado = await existsAsync(tokenHash)
        console.log(resultado)
        return resultado === 1
    }
}