'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ControleBomba extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    equipamento() {
        return this.belongsTo('App/Models/Equipamento')
    }

    local() {
      return this.belongsTo("App/Models/Local");
    }
}

module.exports = ControleBomba
