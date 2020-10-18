'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LocalUsuario extends Model {

  static get table() {
    return 'local_usuario'
}


  local(){ return this.belongsTo('App/Models/Local', 'local_id'); }
  user(){ return this.belongsTo('App/Models/User'); }
}

module.exports = LocalUsuario
