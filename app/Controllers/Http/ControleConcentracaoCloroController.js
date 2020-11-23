"use strict";

const ControleConcentracaoCloro = use("App/Models/ControleConcentracaoCloro");
const Mail = use("Mail");
const formatDate = use("Utils")("formatDate");

class ControleConcentracaoCloroController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_concentracao_cloros = await ControleConcentracaoCloro.query()
      .whereBetween("data", [startDate, endDate])
      .where("local_id", localId)
      .fetch();

    return controle_concentracao_cloros;
  }

  async show({ params }) {
    const controle_concentracao_cloro = await ControleConcentracaoCloro.find(
      params.id
    );

    return controle_concentracao_cloro;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    const controle_concentracao_cloros = await ControleConcentracaoCloro.query()
      .whereBetween("data", [startDate, endDate])
      .where("local_id", localId)
      .fetch();

    await Mail.send(
      "emails.cloros",
      {
        cloros: controle_concentracao_cloros.toJSON(),
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
      (message) => {
        message.to(email).from("appkemia@gmail.com").subject("Kemia");
      }
    );

    return localId;
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "hora",
      "tratado",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_concentracao_cloro = await ControleConcentracaoCloro.create(
      data
    );

    return response.status(201).json(controle_concentracao_cloro);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "hora",
      "tratado",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_concentracao_cloro = await ControleConcentracaoCloro.find(
      params.id
    );

    controle_concentracao_cloro.merge(data);

    await controle_concentracao_cloro.save();

    return controle_concentracao_cloro;
  }

  async destroy({ params }) {
    const controle_concentracao_cloro = await ControleConcentracaoCloro.find(
      params.id
    );

    await controle_concentracao_cloro.delete();
  }
}

module.exports = ControleConcentracaoCloroController;
