'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTratamentoEfluenteLagoaSchema extends Schema {
  up () {
    this.create('tratamento_efluente_lagoas', (table) => {
      table.increments()
      table.date('data').notNullable()
      table.string('ph')
      table.string('od')
      table.string('ss')
      table.string('aeracao')
      table.string('observacao')

      table.string('nivel_lagoa')
      table.string('bomba_recalque_funcionando')
      table.string('observacao_geral')

      table
      .integer('operador_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')

      table
        .integer('lagoa_id')
        .unsigned()
        .references('id')
        .inTable('lagoas')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

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
    this.drop('tratamento_efluente_lagoas')
  }
}

module.exports = CreateTratamentoEfluenteLagoaSchema
