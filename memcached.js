const util = require('util')
const Memcached = require('memcached')
const memcached = new Memcached('localhost:11211', { debug: false })

const memcachedGet = util.promisify(memcached.get).bind(memcached)
const memcachedSet = util.promisify(memcached.set).bind(memcached)

module.exports = {
  get: memcachedGet,
  set: memcachedSet
}
