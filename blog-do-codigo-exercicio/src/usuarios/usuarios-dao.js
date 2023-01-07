const db = require("../../database")
const { InternalServerError } = require("../erros")

module.exports = {
    adiciona: usuario => {
        return new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO usuarios (nome, email, senhaHash)
                VALUES (?, ?, ?)
            `,
            [usuario.nome, usuario.email, usuario.senhaHash],
            erro => {
                if (erro) {
                    reject(new InternalServerError('Erro ao adicionar o usuário!'))
                }
                return resolve()
            })
        })
    },
    buscaPorId: id => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuarios WHERE id=?`,
                [id],
                (erro, usuario) => {
                    if (erro)
                        return reject('Não foi possivel encontrar o usuário!')
                    return resolve(usuario)
                })
        })
    },
    buscaPorEmail: email => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuarios WHERE email=?`,
                [email],
                (erro, usuario) => {
                    if (erro)
                        return reject('Não foi possivel encontrar o usuário!')
                    return resolve(usuario)
                })
        })
    },
    lista: () => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuarios`,
                (erro, usuarios) => {
                    if (erro)
                        return reject('Erro ao listar usuários!')
                    return resolve(usuarios)
                })
        })
    },
    delete: usuario => {
        return new Promise((resolve, reject) => {
            db.get(`DELETE usuarios WHERE id=?`,
                [usuario.id],
                (erro, usuario) => {
                    if (erro)
                        return reject('Erro ao deletar o usuário!')
                    return resolve()
                })
        })
    }
}