"use strict";

const Configuracao = use("App/Models/Configuracao");

class ConfiguracaoController {
  async index({ request }) {

    let { empresaId } = request.all();

    const configuracaos = await Configuracao.query()
      .where("empresa_id", empresaId)
      .fetch();

    return configuracaos;
  }

  async show({ params }) {
    const configuracao = await Configuracao.find(params.id);

    return configuracao;
  }

  async store({ request, response }) {
    const data = request.only([
      "tipo",
      "bruto_min",
      "bruto_max",
      "reator1_min",
      "reator1_max",
      "reator2_min",
      "reator2_max",
      "reator3_min",
      "reator3_max",
      "tratado_min",
      "tratado_max",
      "empresa_id",
    ]);

    const configuracao = await Configuracao.create(data);

    return response.status(201).json(configuracao);
  }

  async update({ request, params, response }) {
    const data = request.only([
      // "tipo",
      "bruto_min",
      "bruto_max",
      "reator1_min",
      "reator1_max",
      "reator2_min",
      "reator2_max",
      "reator3_min",
      "reator3_max",
      "tratado_min",
      "tratado_max",
      // "empresa_id",
    ]);

    const configuracao = await Configuracao.find(params.id);

    configuracao.merge(data);

    await configuracao.save();

    return configuracao;
  }

  async destroy({ params }) {
    const configuracao = await Configuracao.find(params.id);

    await configuracao.delete();
  }
}

module.exports = ConfiguracaoController;
