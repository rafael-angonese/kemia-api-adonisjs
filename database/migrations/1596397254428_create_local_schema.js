'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocalSchema extends Schema {
  up() {
    this.create('locais', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('descricao').notNullable()
      table.string('endereco').notNullable()
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
    this.drop('locais')
  }
}

module.exports = LocalSchema
