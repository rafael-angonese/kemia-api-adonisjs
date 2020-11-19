'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilesSchema extends Schema {
  up () {
    this.table('files', (table) => {
      table
      .integer('polimento_eta_id')
      .unsigned()
      .references('id')
      .inTable('polimento_etas')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')

      table.dropColumn('nome')
    })
  }

  down () {
    this.table('files', (table) => {
      table.dropColumn('polimento_eta_id')
    })
  }
}

module.exports = FilesSchema
