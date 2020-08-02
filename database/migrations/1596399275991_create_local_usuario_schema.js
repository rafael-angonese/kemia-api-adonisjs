'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocalUsuarioSchema extends Schema {
  up() {
    this.create('local_usuario', (table) => {
      table.increments()
      table
        .integer('local_id')
        .unsigned()
        .references('id')
        .inTable('locais')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamps()
    })
  }

  down() {
    this.drop('local_usuario')
  }
}

module.exports = LocalUsuarioSchema
