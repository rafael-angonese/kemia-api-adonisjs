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
      return ["dateFormat"];
    }

    getDateFormat() {
      let date = new Date(this.data);
      date = format(date, "dd/MM/yyyy");
      return date;
    }
}

module.exports = ControleColeta
