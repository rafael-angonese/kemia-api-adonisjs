"use strict";

const TratamentoEfluenteLagoa = use("App/Models/TratamentoEfluenteLagoa");

class TratamentoEfluenteLagoaController {
  async index({ auth, request }) {
    // let auth_user = await auth.getUser()

    let { localId } = request.all();

    const tratamentos = await TratamentoEfluenteLagoa.query()
      // .where('empresa_id', auth_user.empresa_id)
      // .where('local_id', auth_user.local_id)
      .where("local_id", localId)
      // .with('empresa')
      .with('lagoa')
      .fetch();

    return tratamentos;
  }

  async show({ params }) {
    const tratamento = await TratamentoEfluenteLagoa.find(params.id);

    return tratamento;
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "ph",
      "od",
      "ss",
      "aeracao",
      "observacao",
      "nivel_lagoa",
      "bomba_recalque_funcionando",
      "observacao_geral",
      "lagoa_id",
      "empresa_id",
      "local_id",
    ]);

    const tratamento = await TratamentoEfluenteLagoa.create(data);

    return response.status(201).json(tratamento);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "ph",
      "od",
      "ss",
      "aeracao",
      "observacao",
      "nivel_lagoa",
      "bomba_recalque_funcionando",
      "observacao_geral",
      "operador_id",
      "lagoa_id",
      "empresa_id",
      "local_id",
    ]);

    const tratamento = await TratamentoEfluenteLagoa.find(params.id);

    tratamento.merge(data);

    await tratamento.save();

    return tratamento;
  }

  async destroy({ params }) {
    const tratamento = await TratamentoEfluenteLagoa.find(params.id);

    await tratamento.delete();
  }
}

module.exports = TratamentoEfluenteLagoaController;
