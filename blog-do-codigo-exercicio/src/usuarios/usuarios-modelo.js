const { InvalidArgumentError } = require("../erros")
const usuariosDao = require('./usuarios-dao')
const validacoes = require('../validacoes-comuns')
const bcrypt = require('bcrypt')

class Usuario {
    constructor (usuario) {
        this.id = usuario.id
        this.nome = usuario.nome
        this.email = usuario.email
        this.senhaHash = usuario.senhaHash
        // this.emailVerificado = usuario.emailVerificado
        // this.cago = usuario.cargo

        this.valida()
    }

    async adiciona () {
        if (await Usuario.buscaPorEmail(this.email)) {
            throw new InvalidArgumentError('O usuário já existe')
        }
        return usuariosDao.adiciona(this)
    }

    async adicionaSenha (senha) {
        validacoes.campoStringNulo(senha, 'senha')
        validacoes.campoTamanhoMinimo(senha, 'senha', 8)
        validacoes.campoTamanhoMaximo(senha, 'senha', 64)
        this.senhaHash = await Usuario.gerarSenhaHash(senha)
    }

    valida () {
        validacoes.campoStringNulo(this.nome, 'nome')
        validacoes.campoStringNulo(this.email, 'email')
        // validacoes.campoStringNulo(this.senha, 'senha')
        // validacoes.campoTamanhoMinimo(this.senha, 'senha', 8)
        // validacoes.campoTamanhoMaximo(this.senha, 'senha', 64)
    }
    
    static gerarSenhaHash (senha) {
        const custoHash = 12
        return bcrypt.hash(senha, custoHash)
    }

    async deleta () {
        return usuariosDao.deleta(this)
    }

    static async buscaPorId(id) {
        const usuario = await usuariosDao.buscaPorId(id)
        if (!usuario) {
            return null
        }
        return new Usuario(usuario) 
    }

    static async buscaPorEmail (email) {
        const usuario = await usuariosDao.buscaPorEmail(email)
        if (!usuario) {
            return null
        }
        return new Usuario(usuario) 
    }

    static lista () {
        // const bcrypt = require('bcrypt')
        // for (let custo = 6; custo < 18; custo++) {
        //     const tempoInicial = Date.now()
        //     bcrypt.hash('A', custo).then(() => console.log(`custo: ${custo}; tempo: ${Date.now() - tempoInicial} ms`))
        // }
        return usuariosDao.lista()
    }
}

module.exports = Usuario