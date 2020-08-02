'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddEmpresaToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table
      .integer('empresa_id')
      .unsigned()
      .references('id')
      .inTable('empresas')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropForeign('empresa_id')                                         
      table.dropColumn('empresa_id')   
    })
  }
}

module.exports = AddEmpresaToUsersSchema
