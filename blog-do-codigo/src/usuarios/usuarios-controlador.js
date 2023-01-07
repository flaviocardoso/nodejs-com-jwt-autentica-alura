const { InvalidArgumentError, InternalServerError } = require("../erros")
const Usuario = require("./usuarios-modelo")

module.exposts = {
    adiciona: async (req, res) => {
        const { nome, email, senha } = req.body

        try {
            const usuario = new Usuario({
                nome, email, emailVerificado: false
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