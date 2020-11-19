'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PolimentoEta extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    local() {
        return this.belongsTo('App/Models/Local')
    }

    eta() {
      return this.belongsTo('App/Models/Eta')
    }

    operador() {
      return this.belongsTo('App/Models/User')
    }

    files () {
      return this.hasMany('App/Models/File')
    }
}

module.exports = PolimentoEta
