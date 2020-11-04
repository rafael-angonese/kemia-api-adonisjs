"use strict";

const ControleSs = use("App/Models/ControleSs");

class ControleSsController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_sses = await ControleSs.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_sses;
  }

  async show({ params }) {
    const controle_ss = await ControleSs.find(params.id);

    return controle_ss;
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

    const controle_ss = await ControleSs.create(data);

    return response.status(201).json(controle_ss);
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

    const controle_ss = await ControleSs.find(params.id);

    controle_ss.merge(data);

    await controle_ss.save();

    return controle_ss;
  }

  async destroy({ params }) {
    const controle_ss = await ControleSs.find(params.id);

    await controle_ss.delete();
  }
}

module.exports = ControleSsController;
