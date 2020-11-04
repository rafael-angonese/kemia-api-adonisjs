'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEtaSchema extends Schema {
  up () {
    this.create('etas', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('descricao').notNullable()
      table.boolean('is_vazao').notNullable()
      table.boolean('is_ph').notNullable()
      table.boolean('is_pac').notNullable()
      table.boolean('is_polimero').notNullable()
      table.boolean('is_hipoclorito').notNullable()
      table.boolean('is_observacao').notNullable()

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
    this.drop('etas')
  }
}

module.exports = CreateEtaSchema
