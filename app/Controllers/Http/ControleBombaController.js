"use strict";

const ControleBomba = use("App/Models/ControleBomba");
const Mail = use("Mail");
const formatDate = use("Utils")("formatDate");

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

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    const controle_bombas = await ControleBomba.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("equipamento")
      .fetch();

    await Mail.send(
      "emails.bombas",
      {
        bombas: controle_bombas.toJSON(),
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
