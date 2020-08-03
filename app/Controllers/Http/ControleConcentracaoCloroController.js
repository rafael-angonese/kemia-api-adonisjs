'use strict'

const ControleConcentracaoCloro = use('App/Models/ControleConcentracaoCloro')

class ControleConcentracaoCloroController {

  async index({ auth }) {

    let auth_user = await auth.getUser()


    const controle_concentracao_cloros = await ControleConcentracaoCloro.query()
      .where('empresa_id', auth_user.empresa_id)
      // .where('local_id', auth_user.local_id)
      .with('empresa')
      .with('local')
      .fetch()

    return controle_concentracao_cloros
  }

  async show({ params }) {

    const controle_concentracao_cloro = await ControleConcentracaoCloro.find(params.id)

    return controle_concentracao_cloro
  }

  async store({ request, response }) {
    const data = request.only([
      'data',
      'hora',
      'tratado',
      'acao_corretiva',
      'empresa_id',
      'local_id',
    ])

    const controle_concentracao_cloro = await ControleConcentracaoCloro.create(data)

    return response.status(201).json(controle_concentracao_cloro)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'data',
      'hora',
      'tratado',
      'acao_corretiva',
      'empresa_id',
      'local_id',
    ])


    const controle_concentracao_cloro = await ControleConcentracaoCloro.find(params.id)

    controle_concentracao_cloro.merge(data)

    await controle_concentracao_cloro.save()

    return controle_concentracao_cloro
  }

  async destroy({ params }) {

    const controle_concentracao_cloro = await ControleConcentracaoCloro.find(params.id)

    await controle_concentracao_cloro.delete()

  }

}

module.exports = ControleConcentracaoCloroController
