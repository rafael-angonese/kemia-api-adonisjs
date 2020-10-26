'use strict'

const Equipamento = use('App/Models/Equipamento')

class EquipamentoController {

  async index({ auth, request }) {

    // let auth_user = await auth.getUser()

    let { localId } = request.all();


    const equipamentos = await Equipamento.query()
      // .where('empresa_id', auth_user.empresa_id)
      // .where('local_id', auth_user.local_id)
      .where('local_id', localId)
      // .with('empresa')
      // .with('local')
      .fetch()

    return equipamentos
  }

  async show({ params }) {

    const equipamento = await Equipamento.find(params.id)

    return equipamento
  }

  async store({ request, response }) {
    const data = request.only([
      'nome',
      'descricao',
      'empresa_id',
      'local_id',
    ])

    const equipamento = await Equipamento.create(data)

    return response.status(201).json(equipamento)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'nome',
      'descricao',
      'empresa_id',
      'local_id',
    ])

    const equipamento = await Equipamento.find(params.id)

    equipamento.merge(data)

    await equipamento.save()

    return equipamento
  }

  async destroy({ params }) {

    const equipamento = await Equipamento.find(params.id)

    await equipamento.delete()

  }

}

module.exports = EquipamentoController
