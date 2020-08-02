'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEquipamentoSchema extends Schema {
  up() {
    this.create('equipamentos', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('descricao').notNullable()

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
    this.drop('equipamentos')
  }
}

module.exports = CreateEquipamentoSchema
