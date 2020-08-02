'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ControleColeta extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    local() {
        return this.belongsTo('App/Models/Local')
    }
}

module.exports = ControleColeta
