'use strict'

const Local = use('App/Models/Local')

class LocalController {

  async index({ auth }) {

    let auth_user = await auth.getUser()


    const locais = await Local.query()
      .where('empresa_id', auth_user.empresa_id)
      .with('empresa')
      .fetch()

    return locais
  }

  async show({ params }) {

    const local = await Local.find(params.id)

    return local
  }

  async store({ request, response }) {
    const data = request.only([
      'nome',
      'descricao',
      'endereco',
      'empresa_id',
    ])

    const local = await Local.create(data)

    return response.status(201).json(local)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'nome',
      'descricao',
      'endereco',
      'empresa_id',
    ])

    const local = await Local.find(params.id)

    local.merge(data)

    await local.save()

    return local
  }

  async destroy({ params }) {

    const local = await Local.find(params.id)

    await local.delete()

  }

}

module.exports = LocalController
