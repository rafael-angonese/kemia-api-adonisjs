"use strict";

const ControlePh = use("App/Models/ControlePh");

class ControlePhController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_phs = await ControlePh.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_phs;
  }

  async show({ params }) {
    const controle_ph = await ControlePh.find(params.id);

    return controle_ph;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    return localId
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "hora",
      "bruto",
      "reator_1",
      "reator_2",
      "reator_3",
      "tratado",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_ph = await ControlePh.create(data);

    return response.status(201).json(controle_ph);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "hora",
      "bruto",
      "reator_1",
      "reator_2",
      "reator_3",
      "tratado",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_ph = await ControlePh.find(params.id);

    controle_ph.merge(data);

    await controle_ph.save();

    return controle_ph;
  }

  async destroy({ params }) {
    const controle_ph = await ControlePh.find(params.id);

    await controle_ph.delete();
  }
}

module.exports = ControlePhController;
