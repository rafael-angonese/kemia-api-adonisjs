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
}

module.exports = Local
