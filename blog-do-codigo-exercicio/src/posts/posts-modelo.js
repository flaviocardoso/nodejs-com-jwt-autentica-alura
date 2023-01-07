const postDao = require('./posts-dao')
const validacoes = require('../validacoes-comuns')
const postsDao = require('./posts-dao')

class Post {
    constructor (post) {
        this.titulo = post.titulo
        this.conteudo = post.conteudo
        this.valida()
    }

    adiciona () {
        return postsDao.adiciona(this)
    }

    valida () {
        validacoes.campoStringNulo(this.titulo, 'titulo')
        validacoes.campoTamanhoMinimo(this.titulo, 'titulo', 5)

        validacoes.campoStringNulo(this.conteudo, 'conteudo')
        validacoes.campoTamanhoMaximo(this.conteudo, 'conteudo', 140)
    }

    static lista () {
        return postDao.lista()
    }
}

module.exports = Post