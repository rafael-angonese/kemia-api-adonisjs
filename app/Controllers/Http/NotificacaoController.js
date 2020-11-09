"use strict";

const Notificacao = use("App/Models/Notificacao");

class NotificacaoController {
  async index({ request }) {

    let { localId, userId } = request.all();

    const notificacaos = await Notificacao.query()
      .where("local_id", localId)
      .where("user_id", userId)
      .fetch();

    return notificacaos;
  }

  async show({ params }) {
    const notificacao = await Notificacao.find(params.id);

    return notificacao;
  }

}

module.exports = NotificacaoController;
