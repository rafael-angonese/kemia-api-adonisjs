"use strict";

const Notificacao = use("App/Models/Notificacao");

class NotificacaoController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const notificacaos = await Notificacao.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("user", (qr) => qr.select("id", "username"))
      .fetch();

    return notificacaos;
  }

  async show({ params }) {
    const notificacao = await Notificacao.find(params.id);

    return notificacao;
  }
}

module.exports = NotificacaoController;
