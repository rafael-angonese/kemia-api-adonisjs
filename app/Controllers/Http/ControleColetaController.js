"use strict";

const ControleColeta = use("App/Models/ControleColeta");
const Mail = use("Mail");
const formatDate = use("Utils")("formatDate");

class ControleColetaController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_coletas = await ControleColeta.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_coletas;
  }

  async show({ params }) {
    const controle_coleta = await ControleColeta.find(params.id);

    return controle_coleta;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    const controle_coletas = await ControleColeta.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    await Mail.send(
      "emails.coletas",
      {
        coletas: controle_coletas.toJSON(),
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
      "status_coleta",
      "condicao_coleta",
      "empresa_id",
      "local_id",
    ]);

    const controle_coleta = await ControleColeta.create(data);

    return response.status(201).json(controle_coleta);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "status_coleta",
      "condicao_coleta",
      "empresa_id",
      "local_id",
    ]);

    const controle_coleta = await ControleColeta.find(params.id);

    controle_coleta.merge(data);

    await controle_coleta.save();

    return controle_coleta;
  }

  async destroy({ params }) {
    const controle_coleta = await ControleColeta.find(params.id);

    await controle_coleta.delete();
  }
}

module.exports = ControleColetaController;
