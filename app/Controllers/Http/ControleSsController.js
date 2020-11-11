"use strict";

const ControleSs = use("App/Models/ControleSs");
const Helpers = use("Helpers");

class ControleSsController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_sses = await ControleSs.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_sses;
  }

  async show({ params }) {
    const controle_ss = await ControleSs.find(params.id);

    return controle_ss;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    return localId;
  }

  async showImageTratado ({ params, response }) {
    const { id } = params
    return response.download(Helpers.tmpPath(`uploads/${id}_tratado.jpg`))
  }

  async showImageBruto ({ params, response }) {
    const { id } = params
    return response.download(Helpers.tmpPath(`uploads/${id}_bruto.jpg`))
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "hora",
      "bruto",
      "reator_1",
      "reator_2",
      "reator_3",
      "tratado",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_ss = await ControleSs.create(data);

    const efluente_bruto = request.file("efluente_bruto", {
      types: ["image"],
    });

    const efluente_tratado = request.file("efluente_tratado", {
      types: ["image"],
    });

    if (efluente_bruto) {
      await efluente_bruto.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_bruto.jpg`,
        overwrite: true,
      });

      if (!efluente_bruto.moved()) {
        return efluente_bruto.error();
      }
      controle_ss.efluente_bruto = efluente_bruto.fileName;
      await controle_ss.save();
    }

    if (efluente_tratado) {
      await efluente_tratado.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_tratado.jpg`,
        overwrite: true,
      });

      if (!efluente_tratado.moved()) {
        return efluente_tratado.error();
      }
      controle_ss.efluente_tratado = efluente_tratado.fileName;
      await controle_ss.save();
    }

    return response.status(201).json(controle_ss);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "hora",
      "bruto",
      "reator_1",
      "reator_2",
      "reator_3",
      "tratado",
      "acao_corretiva",
      "empresa_id",
      "local_id",
    ]);

    const controle_ss = await ControleSs.find(params.id);

    controle_ss.merge(data);

    await controle_ss.save();

    const efluente_bruto = request.file("efluente_bruto", {
      types: ["image"],
    });

    const efluente_tratado = request.file("efluente_tratado", {
      types: ["image"],
    });

    if (efluente_bruto) {
      await efluente_bruto.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_bruto.jpg`,
        overwrite: true,
      });

      if (!efluente_bruto.moved()) {
        return efluente_bruto.error();
      }
      controle_ss.efluente_bruto = efluente_bruto.fileName;
      await controle_ss.save();
    }

    if (efluente_tratado) {
      await efluente_tratado.move(Helpers.tmpPath("uploads"), {
        name: `${controle_ss.id}_tratado.jpg`,
        overwrite: true,
      });

      if (!efluente_tratado.moved()) {
        return efluente_tratado.error();
      }
      controle_ss.efluente_tratado = efluente_tratado.fileName;
      await controle_ss.save();
    }

    return controle_ss;
  }

  async destroy({ params }) {
    const controle_ss = await ControleSs.find(params.id);

    await controle_ss.delete();
  }
}

module.exports = ControleSsController;
