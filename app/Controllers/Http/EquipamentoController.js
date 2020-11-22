"use strict";

const Equipamento = use("App/Models/Equipamento");
const Notificacao = use("App/Models/Notificacao");
const PushMessageService = use("App/Services/PushMessage/PushMessageService");

class EquipamentoController {
  async index({ request }) {
    let { localId } = request.all();

    const equipamentos = await Equipamento.query()
      .where("local_id", localId)
      .fetch();

    return equipamentos;
  }

  async show({ params }) {
    const equipamento = await Equipamento.find(params.id);

    return equipamento;
  }

  async store({ request, auth, response }) {
    const auth_user = await auth.getUser();
    const data = request.only(["nome", "descricao", "empresa_id", "local_id"]);

    const equipamento = await Equipamento.create(data);

    const notificacaoData = {
      data: new Date(),
      mensagem: `Novo Equipamento Registrado ${equipamento.nome}`,
      empresa_id: equipamento.empresa_id,
      local_id: equipamento.local_id,
      user_id: auth_user.id,
    };

    const notificacao = await Notificacao.create(notificacaoData);

    await new PushMessageService(notificacao.mensagem).call();

    return response.status(201).json(equipamento);
  }

  async update({ request, params, response }) {
    const data = request.only(["nome", "descricao", "empresa_id", "local_id"]);

    const equipamento = await Equipamento.find(params.id);

    equipamento.merge(data);

    await equipamento.save();

    return equipamento;
  }

  async destroy({ params }) {
    const equipamento = await Equipamento.find(params.id);

    await equipamento.delete();
  }
}

module.exports = EquipamentoController;
