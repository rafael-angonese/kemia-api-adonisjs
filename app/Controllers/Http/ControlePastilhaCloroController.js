"use strict";

const ControlePastilhaCloro = use("App/Models/ControlePastilhaCloro");

class ControlePastilhaCloroController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_pastilha_cloros = await ControlePastilhaCloro.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_pastilha_cloros;
  }

  async show({ params }) {
    const controle_pastilha_cloro = await ControlePastilhaCloro.find(params.id);

    return controle_pastilha_cloro;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    return localId
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "hora",
      "quantidade",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_pastilha_cloro = await ControlePastilhaCloro.create(data);

    return response.status(201).json(controle_pastilha_cloro);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "hora",
      "quantidade",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_pastilha_cloro = await ControlePastilhaCloro.find(params.id);

    controle_pastilha_cloro.merge(data);

    await controle_pastilha_cloro.save();

    return controle_pastilha_cloro;
  }

  async destroy({ params }) {
    const controle_pastilha_cloro = await ControlePastilhaCloro.find(params.id);

    await controle_pastilha_cloro.delete();
  }
}

module.exports = ControlePastilhaCloroController;
