'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreatePolimentoEtaSchema extends Schema {
  up () {
    this.create('polimento_etas', (table) => {
      table.increments()
      table.date('data').notNullable()
      table.string('vazao')
      table.string('ph')
      table.string('pac')
      table.string('polimero')
      table.string('hipoclorito')
      table.string('observacao')

      table.string('ph_caixa_saida_eta')
      table.string('ss_caixa_saida_eta')
      table.string('observacao_caixa_saida_eta')

      table.string('ph_caixa_saida_final')
      table.string('ss_caixa_saida_final')
      table.string('observacao_caixa_saida_final')

      table
      .integer('operador_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL')
      .onUpdate('CASCADE')

      table
        .integer('eta_id')
        .unsigned()
        .references('id')
        .inTable('etas')
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
    this.drop('polimento_etas')
  }
}

module.exports = CreatePolimentoEtaSchema
