"use strict";

const ControleSs = use("App/Models/ControleSs");
const Helpers = use("Helpers");
const Configuracao = use("App/Models/Configuracao");
const Notificacao = use("App/Models/Notificacao");
const PushMessageService = use("App/Services/PushMessage/PushMessageService");
const Mail = use("Mail");
const formatDate = use("Utils")("formatDate");

class ControleSsController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_sses = await ControleSs.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_sses;
  }

  async show({ params }) {
    const controle_ss = await ControleSs.find(params.id);

    return controle_ss;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    const controle_sses = await ControleSs.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    await Mail.send(
      "emails.sses",
      {
        sses: controle_sses.toJSON(),
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
      (message) => {
        message.to(email).from("appkemia@gmail.com").subject("Kemia");
      }
    );

    return localId;
  }

  async showImageTratado({ params, response }) {
    const { id } = params;
    return response.download(Helpers.tmpPath(`uploads/${id}_tratado.jpg`));
  }

  async showImageBruto({ params, response }) {
    const { id } = params;
    return response.download(Helpers.tmpPath(`uploads/${id}_bruto.jpg`));
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

    const controle_ss = await ControleSs.create(data);

    const efluente_bruto = request.file("efluente_bruto", {
      types: ["image"],
    });

    const efluente_tratado = request.file("efluente_tratado", {
      types: ["image"],
    });

    if (efluente_bruto) {
      await efluente_bruto.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_bruto.jpg`,
        overwrite: true,
      });

      if (!efluente_bruto.moved()) {
        return efluente_bruto.error();
      }
      controle_ss.efluente_bruto = efluente_bruto.fileName;
      await controle_ss.save();
    }

    if (efluente_tratado) {
      await efluente_tratado.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_tratado.jpg`,
        overwrite: true,
      });

      if (!efluente_tratado.moved()) {
        return efluente_tratado.error();
      }
      controle_ss.efluente_tratado = efluente_tratado.fileName;
      await controle_ss.save();
    }

    const configuracao = await Configuracao.query()
      .where("empresa_id", controle_ss.empresa_id)
      .where("tipo", "SS")
      .first();

    if (!configuracao) {
      return response.status(201).json(controle_ss);
    }

    // Bruto min e max
    if (
      Number.parseFloat(controle_ss.bruto) <
      Number.parseFloat(configuracao.bruto_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: bruto mínimo: ${configuracao.bruto_min} registrado: ${controle_ss.bruto}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ss.bruto) >
      Number.parseFloat(configuracao.bruto_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: bruto máximo: ${configuracao.bruto_max} registrado: ${controle_ss.bruto}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 1
    if (
      Number.parseFloat(controle_ss.reator_1) <
      Number.parseFloat(configuracao.reator1_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Reator 1 mínimo: ${configuracao.reator1_min} registrado: ${controle_ss.reator_1}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ss.reator_1) >
      Number.parseFloat(configuracao.reator1_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Reator 1 máximo: ${configuracao.reator1_max} registrado: ${controle_ss.reator_1}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 2
    if (
      Number.parseFloat(controle_ss.reator_2) <
      Number.parseFloat(configuracao.reator2_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Reator 2 mínimo: ${configuracao.reator2_min} registrado: ${controle_ss.reator_2}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ss.reator_2) >
      Number.parseFloat(configuracao.reator2_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Reator 2 máximo: ${configuracao.reator2_max} registrado: ${controle_ss.reator_2}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Reator 3
    if (
      Number.parseFloat(controle_ss.reator_3) <
      Number.parseFloat(configuracao.reator3_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Reator 3 mínimo: ${configuracao.reator3_min} registrado: ${controle_ss.reator_3}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ss.reator_3) >
      Number.parseFloat(configuracao.reator3_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Reator 3 máximo: ${configuracao.reator3_max} registrado: ${controle_ss.reator_3}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    // Tratado
    if (
      Number.parseFloat(controle_ss.tratado) <
      Number.parseFloat(configuracao.tratado_min)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Tratado mínimo: ${configuracao.tratado_min} registrado: ${controle_ss.tratado}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    if (
      Number.parseFloat(controle_ss.tratado) >
      Number.parseFloat(configuracao.tratado_max)
    ) {
      let notificacaoData = {
        data: new Date(),
        mensagem: `Alteração Controle SS: Tratado máximo: ${configuracao.tratado_max} registrado: ${controle_ss.tratado}`,
        empresa_id: controle_ss.empresa_id,
        local_id: controle_ss.local_id,
        user_id: auth_user.id,
      };

      let notificacao = await Notificacao.create(notificacaoData);

      await new PushMessageService(notificacao.mensagem).call();
    }

    return response.status(201).json(controle_ss);
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

    const controle_ss = await ControleSs.find(params.id);

    controle_ss.merge(data);

    await controle_ss.save();

    const efluente_bruto = request.file("efluente_bruto", {
      types: ["image"],
    });

    const efluente_tratado = request.file("efluente_tratado", {
      types: ["image"],
    });

    if (efluente_bruto) {
      await efluente_bruto.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_bruto.jpg`,
        overwrite: true,
      });

      if (!efluente_bruto.moved()) {
        return efluente_bruto.error();
      }
      controle_ss.efluente_bruto = efluente_bruto.fileName;
      await controle_ss.save();
    }

    if (efluente_tratado) {
      await efluente_tratado.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_tratado.jpg`,
        overwrite: true,
      });

      if (!efluente_tratado.moved()) {
        return efluente_tratado.error();
      }
      controle_ss.efluente_tratado = efluente_tratado.fileName;
      await controle_ss.save();
    }

    return controle_ss;
  }

  async destroy({ params }) {
    const controle_ss = await ControleSs.find(params.id);

    await controle_ss.delete();
  }
}

module.exports = ControleSsController;
