'use strict'

const Empresa = use('App/Models/Empresa')

class EmpresaController {

  async index() {

    const empresas = await Empresa.query().fetch()

    return empresas
  }

  async show({ params }) {

    const empresa = await Empresa.find(params.id)

    return empresa
  }

  async store({ request, response }) {
    const data = request.only([
      'nome',
      'descricao',
    ])

    const empresa = await Empresa.create(data)

    return response.status(201).json(empresa)
  }

  async update({ request, params, response }) {

    const data = request.only([
      'nome',
      'descricao',
    ])

    const empresa = await Empresa.find(params.id)

    empresa.merge(data)

    await empresa.save()

    return empresa
  }

  async destroy({ params }) {

    const empresa = await Empresa.find(params.id)

    await empresa.delete()

  }

}

module.exports = EmpresaController
