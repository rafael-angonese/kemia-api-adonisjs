"use strict";

const ControleTanque = use("App/Models/ControleTanque");
const Mail = use("Mail");
const formatDate = use('Utils')('formatDate')

class ControleTanqueController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_tanques = await ControleTanque.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("tanque")
      .fetch();

    return controle_tanques;
  }

  async show({ params }) {
    const controle_tanque = await ControleTanque.find(params.id);

    return controle_tanque;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    const controle_tanques = await ControleTanque.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("tanque")
      .fetch();

    await Mail.send(
      "emails.tanque",
      {
        tanques: controle_tanques.toJSON(),
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
      (message) => {
        message
          .to(email)
          .from("appkemia@gmail.com")
          .subject("Kemia");
      }
    );

    return localId;
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "hora",
      "tempo_ligado_2cv",
      "tempo_desligado_2cv",
      "tempo_ligado_5cv",
      "tempo_desligado_5cv",
      "acao_corretiva",
      "empresa_id",
      "local_id",
      "tanque_id",
    ]);

    const controle_tanque = await ControleTanque.create(data);

    return response.status(201).json(controle_tanque);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "hora",
      "tempo_ligado_2cv",
      "tempo_desligado_2cv",
      "tempo_ligado_5cv",
      "tempo_desligado_5cv",
      "acao_corretiva",
      "empresa_id",
      "local_id",
      "tanque_id",
    ]);

    const controle_tanque = await ControleTanque.find(params.id);

    controle_tanque.merge(data);

    await controle_tanque.save();

    return controle_tanque;
  }

  async destroy({ params }) {
    const controle_tanque = await ControleTanque.find(params.id);

    await controle_tanque.delete();
  }
}

module.exports = ControleTanqueController;
