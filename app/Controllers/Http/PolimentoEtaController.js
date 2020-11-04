'use strict'

const PolimentoEta = use('App/Models/PolimentoEta')

class PolimentoEtaController {

  async index({ auth, request }) {

    // let auth_user = await auth.getUser()

    let { localId } = request.all();


    const polimentos = await PolimentoEta.query()
      // .where('empresa_id', auth_user.empresa_id)
      // .where('local_id', auth_user.local_id)
      .where('local_id', localId)
      // .with('empresa')
      // .with('local')
      .with('eta')
      .fetch()

    return polimentos
  }

  async show({ params }) {

    const polimento = await PolimentoEta.find(params.id)

    return polimento
  }

  async store({ auth, request, response }) {
    let auth_user = await auth.getUser()

    let data = request.only([
      'data',
      'vazao',
      'ph',
      'pac',
      'polimero',
      'hipoclorito',
      'observacao',
      'ph_caixa_saida_eta',
      'ss_caixa_saida_eta',
      'observacao_caixa_saida_eta',
      'ph_caixa_saida_final',
      'ss_caixa_saida_final',
      'observacao_caixa_saida_final',
      'operador_id',
      'eta_id',
      'empresa_id',
      'local_id',
    ])

    data = {...data, operador_id: auth_user.id  }

    const polimento = await PolimentoEta.create(data)

    return response.status(201).json(polimento)
  }

  async update({ request, params, response }) {

    const dados = request.only([
      'data',
      'vazao',
      'ph',
      'pac',
      'polimero',
      'hipoclorito',
      'observacao',
      'ph_caixa_saida_eta',
      'ss_caixa_saida_eta',
      'observacao_caixa_saida_eta',
      'ph_caixa_saida_final',
      'ss_caixa_saida_final',
      'observacao_caixa_saida_final',
      'operador_id',
      'eta_id',
      'empresa_id',
      'local_id',
    ])

    const polimento = await PolimentoEta.find(params.id)

    polimento.merge(dados)

    await polimento.save()

    return polimento
  }

  async destroy({ params }) {

    const polimento = await PolimentoEta.find(params.id)

    await polimento.delete()

  }

}

module.exports = PolimentoEtaController
