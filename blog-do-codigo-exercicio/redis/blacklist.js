const redis = require('redis')

const client = redis.createClient({
    url: 'redis://meu_redis:6379',
    prefix: 'blacklist'
})
// client['auth'] = null;
client.connect()
client.on('connect', () => {
    console.log('connected!');
});
// client.set('nome', 'Flavio')
module.exports = client