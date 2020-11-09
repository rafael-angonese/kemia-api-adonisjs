'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateNotificacaoSchema extends Schema {
  up () {
    this.create('notificacaos', (table) => {
      table.increments()
      table.date('data')
      table.string('mensagem')

      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
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
    this.drop('notificacaos')
  }
}

module.exports = CreateNotificacaoSchema
