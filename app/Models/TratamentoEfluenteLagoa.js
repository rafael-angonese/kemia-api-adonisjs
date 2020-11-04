'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TratamentoEfluenteLagoa extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    local() {
        return this.belongsTo('App/Models/Local')
    }

    lagoa() {
      return this.belongsTo('App/Models/Lagoa')
    }

    operador() {
      return this.belongsTo('App/Models/User')
    }
}

module.exports = TratamentoEfluenteLagoa
