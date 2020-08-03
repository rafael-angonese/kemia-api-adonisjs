'use strict'

const ControleTanque = use('App/Models/ControleTanque')

class ControleTanqueController {

  async index({ auth }) {

    let auth_user = await auth.getUser()


    const controle_tanques = await ControleTanque.query()
      .where('empresa_id', auth_user.empresa_id)
      .with('empresa')
      .with('tanque')
      .fetch()

    return controle_tanques
  }

  async show({ params }) {

    const controle_tanque = await ControleTanque.find(params.id)

    return controle_tanque
  }

  async store({ request, response }) {
    const data = request.only([
      'data',
      'hora',
      'tempo_ligado_2cv',
      'tempo_desligado_2cv',
      'tempo_ligado_5cv',
      'tempo_desligado_5cv',
      'acao_corretiva',
      'empresa_id',
      'tanque_id',
    ])

    const controle_tanque = await ControleTanque.create(data)

    return response.status(201).json(controle_tanque)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'data',
      'hora',
      'tempo_ligado_2cv',
      'tempo_desligado_2cv',
      'tempo_ligado_5cv',
      'tempo_desligado_5cv',
      'acao_corretiva',
      'empresa_id',
      'tanque_id',
    ])

    const controle_tanque = await ControleTanque.find(params.id)

    controle_tanque.merge(data)

    await controle_tanque.save()

    return controle_tanque
  }

  async destroy({ params }) {

    const controle_tanque = await ControleTanque.find(params.id)

    await controle_tanque.delete()

  }

}

module.exports = ControleTanqueController
