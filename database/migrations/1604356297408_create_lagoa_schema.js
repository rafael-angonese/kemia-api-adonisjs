'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateLagoaSchema extends Schema {
  up () {
    this.create('lagoas', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('descricao').notNullable()
      table.boolean('is_ph').notNullable()
      table.boolean('is_od').notNullable()
      table.boolean('is_ss').notNullable()
      table.boolean('is_aeracao').notNullable()
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
    this.drop('lagoas')
  }
}

module.exports = CreateLagoaSchema
