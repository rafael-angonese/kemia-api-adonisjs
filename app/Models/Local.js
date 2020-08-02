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
}

module.exports = Local
