"use strict";

const ControleBomba = use("App/Models/ControleBomba");

class ControleBombaController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_bombas = await ControleBomba.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("equipamento")
      .fetch();

    return controle_bombas;
  }

  async show({ params }) {
    const controle_bomba = await ControleBomba.find(params.id);

    return controle_bomba;
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "hora",
      "leitura",
      "corrente",
      "acao_corretiva",
      "empresa_id",
      "local_id",
      "equipamento_id",
    ]);

    const controle_bomba = await ControleBomba.create(data);

    return response.status(201).json(controle_bomba);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "hora",
      "leitura",
      "corrente",
      "acao_corretiva",
      "empresa_id",
      "local_id",
      "equipamento_id",
    ]);

    const controle_bomba = await ControleBomba.find(params.id);

    controle_bomba.merge(data);

    await controle_bomba.save();

    return controle_bomba;
  }

  async destroy({ params }) {
    const controle_bomba = await ControleBomba.find(params.id);

    await controle_bomba.delete();
  }
}

module.exports = ControleBombaController;
