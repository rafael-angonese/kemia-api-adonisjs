'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateControleTanqueSchema extends Schema {
  up() {
    this.create('controle_tanques', (table) => {
      table.increments()
      table.date('data').notNullable()
      table.time('hora').notNullable()
      table.string('tempo_ligado_2cv').notNullable()
      table.string('tempo_desligado_2cv').notNullable()
      table.string('tempo_ligado_5cv').notNullable()
      table.string('tempo_desligado_5cv').notNullable()
      table.string('acao_corretiva').notNullable()

      table
        .integer('tanque_id')
        .unsigned()
        .references('id')
        .inTable('tanques')
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
    this.drop('controle_tanques')
  }
}

module.exports = CreateControleTanqueSchema
