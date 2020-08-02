'use strict'

const ControleOd = use('App/Models/ControleOd')

class ControleOdController {

  async index({ auth }) {

    let auth_user = await auth.getUser()


    const controle_ods = await ControleOd.query()
      .where('empresa_id', auth_user.empresa_id)
      // .where('local_id', auth_user.local_id)
      .with('empresa')
      .with('local')
      .fetch()

    return controle_ods
  }

  async show({ params }) {

    const controle_od = await ControleOd.find(params.id)

    return controle_od
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

    const controle_od = await ControleOd.create(data)

    return response.status(201).json(controle_od)
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

    const controle_od = await ControleOd.find(params.id)

    controle_od.merge(data)

    await controle_od.save()

    return controle_od
  }

  async destroy({ params }) {

    const controle_od = await ControleOd.find(params.id)

    await controle_od.delete()

  }

}

module.exports = ControleOdController
