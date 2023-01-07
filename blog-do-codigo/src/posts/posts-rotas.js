const postsControlador = require('./posts-controlador')

module.exposts = app => {
    app.route('post')
        .get(postsControlador.lista)
        .post(postsControlador.adicina)
}