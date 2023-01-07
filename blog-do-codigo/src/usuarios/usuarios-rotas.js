const usuariosControlador = require('./usuarios-controlador')

module.exposts = app => {
    app.route('/usuario')
        .post(usuariosControlador.adiciona)
        .get(usuariosControlador.lista)
    app.route('/usuario/:id')
        .delete(usuariosControlador.deleta)
}