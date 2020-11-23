'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const format = use("date-fns/format");

class ControleColeta extends Model {

    empresa() {
        return this.belongsTo('App/Models/Empresa')
    }

    local() {
        return this.belongsTo('App/Models/Local')
    }

    static get computed() {
      return ["dateFormat", "statusColeta", "condicaoColeta"];
    }

    getStatusColeta() {
      let status_coleta = "";

      if (this.status_coleta == 1) {
        status_coleta = "Realizada";
      }

      if (this.status_coleta == 2) {
        status_coleta = "Adiada";
      }
      return status_coleta;
    }

    getCondicaoColeta() {
      let condicao_coleta = "";

      if (this.condicao_coleta == 1) {
        condicao_coleta = "Ensoralada";
      }

      if (this.condicao_coleta == 2) {
        condicao_coleta = "Chuvoso";
      }

      if (this.condicao_coleta == 3) {
        condicao_coleta = "Garoa";
      }

      return condicao_coleta;
    }

    getDateFormat() {
      let date = new Date(this.data);
      date = format(date, "dd/MM/yyyy");
      return date;
    }
}

module.exports = ControleColeta
