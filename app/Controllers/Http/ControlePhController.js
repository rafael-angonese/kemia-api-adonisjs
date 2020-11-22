"use strict";

const ControlePh = use("App/Models/ControlePh");
const Configuracao = use("App/Models/Configuracao");
const Notificacao = use("App/Models/Notificacao");
const PushMessageService = use("App/Services/PushMessage/PushMessageService");

class ControlePhController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_phs = await ControlePh.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_phs;
  }

  async show({ params }) {
    const controle_ph = await ControlePh.find(params.id);

    return controle_ph;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    return localId;
  }

  async store({ request, auth, response }) {
    const auth_user = await auth.getUser();
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

    const controle_ph = await ControlePh.create(data);

    const configuracao = await Configuracao.query()
      .where("empresa_id", controle_ph.empresa_id)
      .where("tipo", "PH")
      .first();

    if (!configuracao) {
      return response.status(201).json(controle_ph);
    }

    // Bruto min e max
    if (
      Number.parseFloat(controle_ph.bruto) <
      Number.parseFloat(configuracao.bruto_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: bruto mínimo: ${configuracao.bruto_min} registrado: ${controle_ph.bruto}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ph.bruto) >
      Number.parseFloat(configuracao.bruto_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: bruto máximo: ${configuracao.bruto_max} registrado: ${controle_ph.bruto}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 1
    if (
      Number.parseFloat(controle_ph.reator_1) <
      Number.parseFloat(configuracao.reator1_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Reator 1 mínimo: ${configuracao.reator1_min} registrado: ${controle_ph.reator_1}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ph.reator_1) >
      Number.parseFloat(configuracao.reator1_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Reator 1 máximo: ${configuracao.reator1_max} registrado: ${controle_ph.reator_1}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 2
    if (
      Number.parseFloat(controle_ph.reator_2) <
      Number.parseFloat(configuracao.reator2_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Reator 2 mínimo: ${configuracao.reator2_min} registrado: ${controle_ph.reator_2}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ph.reator_2) >
      Number.parseFloat(configuracao.reator2_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Reator 2 máximo: ${configuracao.reator2_max} registrado: ${controle_ph.reator_2}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 3
    if (
      Number.parseFloat(controle_ph.reator_3) <
      Number.parseFloat(configuracao.reator3_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Reator 3 mínimo: ${configuracao.reator3_min} registrado: ${controle_ph.reator_3}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ph.reator_3) >
      Number.parseFloat(configuracao.reator3_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Reator 3 máximo: ${configuracao.reator3_max} registrado: ${controle_ph.reator_3}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Tratado
    if (
      Number.parseFloat(controle_ph.tratado) <
      Number.parseFloat(configuracao.tratado_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Tratado mínimo: ${configuracao.tratado_min} registrado: ${controle_ph.tratado}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ph.tratado) >
      Number.parseFloat(configuracao.tratado_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle PH: Tratado máximo: ${configuracao.tratado_max} registrado: ${controle_ph.tratado}`,
        empresa_id: controle_ph.empresa_id,
        local_id: controle_ph.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    return response.status(201).json(controle_ph);
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

    const controle_ph = await ControlePh.find(params.id);

    controle_ph.merge(data);

    await controle_ph.save();

    return controle_ph;
  }

  async destroy({ params }) {
    const controle_ph = await ControlePh.find(params.id);

    await controle_ph.delete();
  }
}

module.exports = ControlePhController;
