'use strict'

const ControleVazao = use('App/Models/ControleVazao')

class ControleVazaoController {

  async index({ auth }) {

    let auth_user = await auth.getUser()


    const controle_vazaos = await ControleVazao.query()
      .where('empresa_id', auth_user.empresa_id)
      // .where('local_id', auth_user.local_id)
      .with('empresa')
      .with('local')
      .fetch()

    return controle_vazaos
  }

  async show({ params }) {

    const controle_vazao = await ControleVazao.find(params.id)

    return controle_vazao
  }

  async store({ request, response }) {
    const data = request.only([
      'data',
      'hora',
      'vazao_dia',
      'empresa_id',
      'local_id',
    ])

    const controle_vazao = await ControleVazao.create(data)

    return response.status(201).json(controle_vazao)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'data',
      'hora',
      'vazao_dia',
      'empresa_id',
      'local_id',
    ])


    const controle_vazao = await ControleVazao.find(params.id)

    controle_vazao.merge(data)

    await controle_vazao.save()

    return controle_vazao
  }

  async destroy({ params }) {

    const controle_vazao = await ControleVazao.find(params.id)

    await controle_vazao.delete()

  }

}

module.exports = ControleVazaoController
