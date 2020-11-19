'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class File extends Model {

  polimento() {
    return this.belongsTo('App/Models/PolimentoEta')
  }

}

module.exports = File
