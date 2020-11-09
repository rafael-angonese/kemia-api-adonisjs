'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Configuracao extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }
}

module.exports = Configuracao
