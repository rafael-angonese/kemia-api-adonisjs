'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Empresa extends Model {

    users() {
        return this.hasMany('App/Models/User')
    }

    locais() {
        return this.hasMany('App/Models/Local')
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

    controleTanques() {
        return this.hasMany('App/Models/ControleTanque')
    }
}

module.exports = Empresa
