'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEquipamentoManutencaoSchema extends Schema {
  up () {
    this.create('equipamento_manutencaos', (table) => {
      table.increments()
      table.date('saida').notNullable()
      table.date('retorno').nullable()
      table.string('problema').notNullable()

      table
        .integer('equipamento_id')
        .unsigned()
        .references('id')
        .inTable('equipamentos')
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
    this.drop('equipamento_manutencaos')
  }
}

module.exports = CreateEquipamentoManutencaoSchema
