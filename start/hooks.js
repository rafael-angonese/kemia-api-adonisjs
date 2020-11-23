const { ioc } = require('@adonisjs/fold')
const path = require('path')

ioc.bind('Utils', () => {
  return (file) => require(path.join(__dirname, '..', 'utils', file))
})
