"use strict";

const PolimentoEta = use("App/Models/PolimentoEta");
const Helpers = use("Helpers");

class PolimentoEtaController {
  async index({ auth, request }) {
    let { localId, startDate, endDate } = request.all();

    const polimentos = await PolimentoEta.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("eta")
      .with("files")
      .fetch();

    return polimentos;
  }

  async show({ params }) {
    const polimento = await PolimentoEta.find(params.id);

    await polimento.load("files");

    return polimento;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    return localId;
  }

  async store({ auth, request, response }) {
    let auth_user = await auth.getUser();

    let data = request.only([
      "data",
      "vazao",
      "ph",
      "pac",
      "polimero",
      "hipoclorito",
      "observacao",
      "ph_caixa_saida_eta",
      "ss_caixa_saida_eta",
      "observacao_caixa_saida_eta",
      "ph_caixa_saida_final",
      "ss_caixa_saida_final",
      "observacao_caixa_saida_final",
      "operador_id",
      "eta_id",
      "empresa_id",
      "local_id",
    ]);

    data = { ...data, operador_id: auth_user.id };

    const polimento = await PolimentoEta.create(data);

    const images = request.file("image", {
      types: ["image"],
    });

    if (images) {
      await images.moveAll(Helpers.tmpPath("uploads"), (file) => ({
        name: `polimento-${polimento.id}-${Date.now()}-${file.clientName}`,
      }));

      if (!images.movedAll()) {
        return images.errors();
      }

      await Promise.all(
        images
          .movedList()
          .map((image) => polimento.files().create({ path: image.fileName }))
      );
    }

    return response.status(201).json(polimento);
  }

  async update({ request, params, response }) {
    const dados = request.only([
      "data",
      "vazao",
      "ph",
      "pac",
      "polimero",
      "hipoclorito",
      "observacao",
      "ph_caixa_saida_eta",
      "ss_caixa_saida_eta",
      "observacao_caixa_saida_eta",
      "ph_caixa_saida_final",
      "ss_caixa_saida_final",
      "observacao_caixa_saida_final",
      "operador_id",
      "eta_id",
      "empresa_id",
      "local_id",
    ]);

    const polimento = await PolimentoEta.find(params.id);

    polimento.merge(dados);

    await polimento.save();

    const images = request.file("image", {
      types: ["image"],
    });

    if (images) {
      await images.moveAll(Helpers.tmpPath("uploads"), (file) => ({
        name: `polimento-${polimento.id}-${Date.now()}-${file.clientName}`,
      }));

      if (!images.movedAll()) {
        return images.errors();
      }

      await Promise.all(
        images
          .movedList()
          .map((image) => polimento.files().create({ path: image.fileName }))
      );
    }

    return polimento;
  }

  async destroy({ params }) {
    const polimento = await PolimentoEta.find(params.id);

    await polimento.delete();
  }
}

module.exports = PolimentoEtaController;
