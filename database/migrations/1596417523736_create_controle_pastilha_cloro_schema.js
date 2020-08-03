'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateControlePastilhaCloroSchema extends Schema {
  up () {
    this.create('controle_pastilha_cloros', (table) => {
      table.increments()
      table.date('data').notNullable()
      table.time('hora').notNullable()
      table.float('quantidade').notNullable()
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

  down () {
    this.drop('controle_pastilha_cloros')
  }
}

module.exports = CreateControlePastilhaCloroSchema
