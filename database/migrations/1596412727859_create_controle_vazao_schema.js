'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateControleVazaoSchema extends Schema {
  up () {
    this.create('controle_vazaos', (table) => {
      table.increments()
      table.date('data').notNullable()
      table.time('hora').notNullable()
      table.float('vazao_dia').notNullable()

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
    this.drop('controle_vazaos')
  }
}

module.exports = CreateControleVazaoSchema
