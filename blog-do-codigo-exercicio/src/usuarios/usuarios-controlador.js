const jwt = require('jsonwebtoken')
const { InvalidArgumentError, InternalServerError } = require("../erros")
const Usuario = require("./usuarios-modelo")
const blacklist = require('../../redis/manipula-blacklist')

function criarTokenJWT (usuario) {
    const cincoDiasEmMilissegundos = 432000000
    const payload = {
        id: usuario.id,
        expiraEm: Date.now() + cincoDiasEmMilissegundos
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
    return token
}

module.exports = {
    adiciona: async (req, res) => {
        const { nome, email, senha } = req.body

        try {
            const usuario = new Usuario({
                nome, email
            })
            await usuario.adicionaSenha(senha)
            await usuario.adiciona()
            res.status(201).end()
        } catch (erro) {
            if (erro instanceof InvalidArgumentError) {
                res.status(422).json({ erro: erro.message })
            } else if (erro instanceof InternalServerError) {
                res.status(500).json({ erro : erro.message })
            } else {
                res.status(500).json({ erro: erro.message })
            }
        }
    },
    login: async (req, res) => {
        const token = criarTokenJWT(req.user)
        res
            .set('Authorization', token)
            .status(204).end()
    },
    logout: async (req, res) => {
        try {
            const token = req.token
            await blacklist.adiciona(token)
            res.status(204).end()
        } catch (error) {
            res.status(500).end()
        }
    },
    lista: async (req, res) => {
        const usuarios = await Usuario.lista()
        res.json(usuarios)
    },
    deleta: async (req, res) => {
        const usuario = await Usuario.buscaPorId(req.params.id)
        try {
            await usuario.deleta()
            res.status(200).end()
        } catch (erro) {
            res.status(500).json({ erro: erro.message })
        }
    }
}