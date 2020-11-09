"use strict";

const Empresa = use("App/Models/Empresa");
const Configuracao = use("App/Models/Configuracao");

class EmpresaController {
  async index() {
    const empresas = await Empresa.query().fetch();

    return empresas;
  }

  async show({ params }) {
    const empresa = await Empresa.find(params.id);

    return empresa;
  }

  async store({ request, response }) {
    const data = request.only(["nome", "descricao"]);

    const empresa = await Empresa.create(data);

    await Configuracao.create({
      tipo: "OD",
      bruto_min: "2",
      bruto_max: "2",
      reator1_min: "2",
      reator1_max: "2",
      reator2_min: "2",
      reator2_max: "2",
      reator3_min: "2",
      reator3_max: "2",
      tratado_min: "2",
      tratado_max: "2",
      empresa_id: empresa.id,
    });

    await Configuracao.create({
      tipo: "SS",
      bruto_min: "2",
      bruto_max: "2",
      reator1_min: "2",
      reator1_max: "2",
      reator2_min: "2",
      reator2_max: "2",
      reator3_min: "2",
      reator3_max: "2",
      tratado_min: "2",
      tratado_max: "2",
      empresa_id: empresa.id,
    });

    await Configuracao.create({
      tipo: "PH",
      bruto_min: "2",
      bruto_max: "2",
      reator1_min: "2",
      reator1_max: "2",
      reator2_min: "2",
      reator2_max: "2",
      reator3_min: "2",
      reator3_max: "2",
      tratado_min: "2",
      tratado_max: "2",
      empresa_id: empresa.id,
    });

    return response.status(201).json(empresa);
  }

  async update({ request, params, response }) {
    const data = request.only(["nome", "descricao"]);

    const empresa = await Empresa.find(params.id);

    empresa.merge(data);

    await empresa.save();

    return empresa;
  }

  async destroy({ params }) {
    const empresa = await Empresa.find(params.id);

    await empresa.delete();
  }
}

module.exports = EmpresaController;
