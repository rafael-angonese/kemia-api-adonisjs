"use strict";

const ControleOd = use("App/Models/ControleOd");
const Configuracao = use("App/Models/Configuracao");
const Notificacao = use("App/Models/Notificacao");
const PushMessageService = use("App/Services/PushMessage/PushMessageService");
const Mail = use("Mail");
const formatDate = use("Utils")("formatDate");

class ControleOdController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_ods = await ControleOd.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_ods;
  }

  async show({ params }) {
    const controle_od = await ControleOd.find(params.id);

    return controle_od;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    const controle_ods = await ControleOd.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    await Mail.send(
      "emails.ods",
      {
        ods: controle_ods.toJSON(),
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
      (message) => {
        message.to(email).from("appkemia@gmail.com").subject("Kemia");
      }
    );

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

    const controle_od = await ControleOd.create(data);

    const configuracao = await Configuracao.query()
      .where("empresa_id", controle_od.empresa_id)
      .where("tipo", "OD")
      .first();

    if (!configuracao) {
      return response.status(201).json(controle_od);
    }

    // Bruto min e max
    if (
      Number.parseFloat(controle_od.bruto) <
      Number.parseFloat(configuracao.bruto_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: bruto mínimo: ${configuracao.bruto_min} registrado: ${controle_od.bruto}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_od.bruto) >
      Number.parseFloat(configuracao.bruto_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: bruto máximo: ${configuracao.bruto_max} registrado: ${controle_od.bruto}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 1
    if (
      Number.parseFloat(controle_od.reator_1) <
      Number.parseFloat(configuracao.reator1_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Reator 1 mínimo: ${configuracao.reator1_min} registrado: ${controle_od.reator_1}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_od.reator_1) >
      Number.parseFloat(configuracao.reator1_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Reator 1 máximo: ${configuracao.reator1_max} registrado: ${controle_od.reator_1}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 2
    if (
      Number.parseFloat(controle_od.reator_2) <
      Number.parseFloat(configuracao.reator2_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Reator 2 mínimo: ${configuracao.reator2_min} registrado: ${controle_od.reator_2}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_od.reator_2) >
      Number.parseFloat(configuracao.reator2_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Reator 2 máximo: ${configuracao.reator2_max} registrado: ${controle_od.reator_2}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 3
    if (
      Number.parseFloat(controle_od.reator_3) <
      Number.parseFloat(configuracao.reator3_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Reator 3 mínimo: ${configuracao.reator3_min} registrado: ${controle_od.reator_3}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_od.reator_3) >
      Number.parseFloat(configuracao.reator3_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Reator 3 máximo: ${configuracao.reator3_max} registrado: ${controle_od.reator_3}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Tratado
    if (
      Number.parseFloat(controle_od.tratado) <
      Number.parseFloat(configuracao.tratado_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Tratado mínimo: ${configuracao.tratado_min} registrado: ${controle_od.tratado}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_od.tratado) >
      Number.parseFloat(configuracao.tratado_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle OD: Tratado máximo: ${configuracao.tratado_max} registrado: ${controle_od.tratado}`,
        empresa_id: controle_od.empresa_id,
        local_id: controle_od.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    return response.status(201).json(controle_od);
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

    const controle_od = await ControleOd.find(params.id);

    controle_od.merge(data);

    await controle_od.save();

    return controle_od;
  }

  async destroy({ params }) {
    const controle_od = await ControleOd.find(params.id);

    await controle_od.delete();
  }
}

module.exports = ControleOdController;
