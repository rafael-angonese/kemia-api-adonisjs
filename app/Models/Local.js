'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Local extends Model {

    static get table() {
        return 'locais'
    }

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    users() {
        return this.belongsToMany('App/Models/User').pivotTable('local_usuario').withTimestamps()
    }

    equipamentos() {
        return this.hasMany('App/Models/Equipamento')
    }

    tanques() {
        return this.hasMany('App/Models/Tanque')
    }

    controleColetas() {
        return this.hasMany('App/Models/ControleColeta')
    }

    controleOds() {
        return this.hasMany('App/Models/ControleOd')
    }

    controlePhs() {
        return this.hasMany('App/Models/ControlePh')
    }

    controleSses() {
        return this.hasMany('App/Models/ControleSs')
    }

    controleConcentracaoCloros() {
        return this.hasMany('App/Models/ControleConcentracaoCloro')
    }

    controlePastilhaCloros() {
        return this.hasMany('App/Models/ControlePastilhaCloro')
    }
}

module.exports = Local
