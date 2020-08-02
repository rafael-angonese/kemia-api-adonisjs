'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateControleColetaSchema extends Schema {
  up () {
    this.create('controle_coletas', (table) => {
      table.increments()
      table.integer('status_coleta').notNullable()
      table.integer('condicao_coleta').notNullable()
      table.date('data').notNullable()

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

  down () {
    this.drop('controle_coletas')
  }
}

module.exports = CreateControleColetaSchema
