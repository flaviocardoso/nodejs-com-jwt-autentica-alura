module.exports = {
    rotas: require('./usuarios-rotas'),
    controlador: require('./usuarios-modelo'),
    modelo: require('./usuarios-modelo'),
    estrategiasAutenticacao: require('./estrategias-autenticacao'),
    middlewaresAutenticacao: require('./middlewares-autenticao')
}