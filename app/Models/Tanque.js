'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tanque extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    local() {
        return this.belongsTo('App/Models/Local')
    }

    controleTanques() {
        return this.hasMany('App/Models/ControleTanque')
    }
    
}

module.exports = Tanque
