"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreateControleBombaSchema extends Schema {
  up() {
    this.create("controle_bombas", (table) => {
      table.increments();
      table.date("data").notNullable();
      table.time("hora").notNullable();
      table.float("leitura").notNullable();
      table.float("corrente").notNullable();
      table.string("acao_corretiva").notNullable();

      table
        .integer("local_id")
        .unsigned()
        .references("id")
        .inTable("locais")
        .onDelete("SET NULL")
        .onUpdate("CASCADE");

      table
        .integer("equipamento_id")
        .unsigned()
        .references("id")
        .inTable("equipamentos")
        .onDelete("SET NULL")
        .onUpdate("CASCADE");

      table
        .integer("empresa_id")
        .unsigned()
        .references("id")
        .inTable("empresas")
        .onDelete("SET NULL")
        .onUpdate("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("controle_bombas");
  }
}

module.exports = CreateControleBombaSchema;
