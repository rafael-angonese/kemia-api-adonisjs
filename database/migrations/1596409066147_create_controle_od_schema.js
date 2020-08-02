'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateControleOdSchema extends Schema {
  up() {
    this.create('controle_ods', (table) => {
      table.increments()
      table.date('data').notNullable()
      table.time('hora').notNullable()
      table.float('bruto').notNullable()
      table.float('reator_1').notNullable()
      table.float('reator_2').notNullable()
      table.float('reator_3').notNullable()
      table.float('tratado').notNullable()
      table.string('acao_corretiva').notNullable()

      table
        .integer('local_id')
        .unsigned()
        .references('id')
        .inTable('locais')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

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

  down() {
    this.drop('controle_ods')
  }
}

module.exports = CreateControleOdSchema
