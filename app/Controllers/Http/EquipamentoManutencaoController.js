'use strict'

const EquipamentoManutencao = use('App/Models/EquipamentoManutencao')

class EquipamentoManutencaoController {

  async index({ request }) {

    let { localId, startDate, endDate } = request.all();

    const equipamento_manutencaos = await EquipamentoManutencao.query()
      .where('local_id', localId)
      .whereBetween("saida", [startDate, endDate])
      .with('equipamento')
      .fetch()

    return equipamento_manutencaos
  }

  async show({ params }) {

    const equipamento_manutencao = await EquipamentoManutencao.find(params.id)

    return equipamento_manutencao
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    return localId
  }

  async store({ request, response }) {
    const data = request.only([
      'saida',
      'retorno',
      'problema',
      'equipamento_id',
      'local_id',
      'empresa_id',
    ])

    const equipamento_manutencao = await EquipamentoManutencao.create(data)

    return response.status(201).json(equipamento_manutencao)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'saida',
      'retorno',
      'problema',
      'equipamento_id',
      'local_id',
      'empresa_id',
    ])

    const equipamento_manutencao = await EquipamentoManutencao.find(params.id)

    equipamento_manutencao.merge(data)

    await equipamento_manutencao.save()

    return equipamento_manutencao
  }

  async destroy({ params }) {

    const equipamento_manutencao = await EquipamentoManutencao.find(params.id)

    await equipamento_manutencao.delete()

  }

}

module.exports = EquipamentoManutencaoController
