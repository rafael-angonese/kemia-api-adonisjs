'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateFileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = CreateFileSchema
