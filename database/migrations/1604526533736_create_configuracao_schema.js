'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateConfiguracaoSchema extends Schema {
  up () {
    this.create('configuracaos', (table) => {
      table.increments()
      table.string('tipo')
      table.string('bruto_min')
      table.string('bruto_max')
      table.string('reator1_min')
      table.string('reator1_max')
      table.string('reator2_min')
      table.string('reator2_max')
      table.string('reator3_min')
      table.string('reator3_max')
      table.string('tratado_min')
      table.string('tratado_max')

      table
        .integer('empresa_id')
        .unsigned()
        .references('id')
        .inTable('empresas')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('configuracaos')
  }
}

module.exports = CreateConfiguracaoSchema
