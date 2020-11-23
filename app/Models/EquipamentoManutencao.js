"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const format = use("date-fns/format");

class EquipamentoManutencao extends Model {
  empresa() {
    return this.belongsTo("App/Models/Empresa");
  }

  equipamento() {
    return this.belongsTo("App/Models/Equipamento");
  }

  local() {
    return this.belongsTo("App/Models/Local");
  }

  static get computed() {
    return ["saidaFormat", "retornoFormat"];
  }

  getSaidaFormat() {
    let date = new Date(this.saida);
    date = format(date, "dd/MM/yyyy");
    return date;
  }

  getRetornoFormat() {
    let date = "";
    if (this.retorno) {
      date = new Date(this.retorno);
      date = format(date, "dd/MM/yyyy");
    }
    return date;
  }
}

module.exports = EquipamentoManutencao;
