'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ControleTanque extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    tanque() {
        return this.belongsTo('App/Models/Tanque')
    }
}

module.exports = ControleTanque
