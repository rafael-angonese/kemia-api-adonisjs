"use strict";

const Equipamento = use("App/Models/Equipamento");

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

  async store({ request, response }) {
    const data = request.only(["nome", "descricao", "empresa_id", "local_id"]);

    const equipamento = await Equipamento.create(data);

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
