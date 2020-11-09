'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTarefaSchema extends Schema {
  up () {
    this.create('tarefas', (table) => {
      table.increments()
      table.date('data')
      table.string('atividade')

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
    this.drop('tarefas')
  }
}

module.exports = CreateTarefaSchema
