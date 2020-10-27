'use strict'

const ControlePh = use('App/Models/ControlePh')

class ControlePhController {

  async index({ auth, request }) {

    let auth_user = await auth.getUser()

    let { localId } = request.all();

    const controle_phs = await ControlePh.query()
      // .where('empresa_id', auth_user.empresa_id)
      // .where('local_id', auth_user.local_id)
      .where('local_id', localId)
      // .with('empresa')
      // .with('local')
      .fetch()

    return controle_phs
  }

  async show({ params }) {

    const controle_ph = await ControlePh.find(params.id)

    return controle_ph
  }

  async store({ request, response }) {
    const data = request.only([
      'data',
      'hora',
      'bruto',
      'reator_1',
      'reator_2',
      'reator_3',
      'tratado',
      'acao_corretiva',
      'empresa_id',
      'local_id',
    ])

    const controle_ph = await ControlePh.create(data)

    return response.status(201).json(controle_ph)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'data',
      'hora',
      'bruto',
      'reator_1',
      'reator_2',
      'reator_3',
      'tratado',
      'acao_corretiva',
      'empresa_id',
      'local_id',
    ])

    const controle_ph = await ControlePh.find(params.id)

    controle_ph.merge(data)

    await controle_ph.save()

    return controle_ph
  }

  async destroy({ params }) {

    const controle_ph = await ControlePh.find(params.id)

    await controle_ph.delete()

  }

}

module.exports = ControlePhController
