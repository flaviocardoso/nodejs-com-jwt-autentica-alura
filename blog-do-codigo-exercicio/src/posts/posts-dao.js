const db = require('../../database')

module.exports = {
    adiciona: post => {
        new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO posts (
                    titulo, conteudo
                ) VALUES (?, ?)
            `, 
            [post.titulo, post.conteudo],
            erro => {
                if (erro) {
                    return reject('Erro ao adicionar o post!')
                }
                return resolve()
            })
        })
    },
    lista: () => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM posts`, (erro, results) => {
                if (erro) {
                    return reject(`Erro ao listar os posts!`)
                }
                return resolve(results)
            })
        })
    }
}