"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const format = use("date-fns/format");

class TratamentoEfluenteLagoa extends Model {
  empresa() {
    return this.belongsTo("App/Models/Empresa");
  }

  local() {
    return this.belongsTo("App/Models/Local");
  }

  lagoa() {
    return this.belongsTo("App/Models/Lagoa");
  }

  operador() {
    return this.belongsTo("App/Models/User");
  }

  static get computed() {
    return ["dateFormat", "nivelLagoa", "recalque"];
  }

  getNivelLagoa() {
    let nivel_lagoa = "";

    if (this.nivel_lagoa == 1) {
      nivel_lagoa = "Baixa";
    }

    if (this.nivel_lagoa == 2) {
      nivel_lagoa = "Média";
    }

    if (this.nivel_lagoa == 3) {
      nivel_lagoa = "Alta";
    }

    return nivel_lagoa;
  }

  getRecalque() {
    let recalque = "";

    if (this.bomba_recalque_funcionando == 1) {
      recalque = "1";
    }

    if (this.bomba_recalque_funcionando == 2) {
      recalque = "2";
    }

    if (this.bomba_recalque_funcionando == 3) {
      recalque = "Ambos";
    }

    return recalque;
  }

  getDateFormat() {
    let date = new Date(this.data);
    date = format(date, "dd/MM/yyyy");
    return date;
  }
}

module.exports = TratamentoEfluenteLagoa;
