"use strict";

const User = use("App/Models/User");
const LocalUsuario = use("App/Models/LocalUsuario");

class UserController {
  async index({ request, response }) {
    let { empresaId } = request.all();

    const users = await User.query()
      .select("id", "username", "nome", "tipo", "empresa_id")
      .where("empresa_id", empresaId)
      .with("locais", (qr) => qr.where("empresa_id", empresaId))
      .fetch();

    return users;
  }

  async operadores({ request, auth, response }) {
    let { empresaId } = request.all();

    const users = await User.query()
      .select("id", "username", "nome", "tipo", "empresa_id")
      .where("empresa_id", empresaId)
      .where("tipo", "operator")
      .fetch();

    return users;
  }

  async operadoresByLocal({ request, auth, response }) {
    let { empresaId, localId } = request.all();

    const usersIds = await LocalUsuario.query()
      .where("local_id", localId)
      .pluck("user_id");

    const users = await User.query()
      .select("id", "username", "nome", "tipo", "empresa_id")
      .where("empresa_id", empresaId)
      .whereIn("id", usersIds)
      .where("tipo", "operator")
      .fetch();

    return users;
  }

  async show({ params }) {
    const user = await User.query()
      .where("id", params.id)
      .select("id", "username", "nome", "tipo", "empresa_id")
      .with("empresa")
      .with("locais")
      .first();

    return user;
  }

  async store({ request, response }) {
    const data = request.only([
      "username",
      "nome",
      "senha",
      "tipo",
      "empresa_id",
    ]);

    const user = await User.create(data);

    const { locais } = request.post();

    if (locais && locais.length > 0) {
      await user.locais().attach(locais);
    }

    return response.status(201).json({
      id: user.id,
      username: user.username,
      nome: user.nome,
      tipo: user.tipo,
      empresa_id: user.empresa_id,
    });
  }

  async update({ request, params, response }) {
    const data = request.only(["username", "nome", "tipo", "empresa_id"]);

    const user = await User.find(params.id);

    user.merge(data);

    await user.save();

    const { locais } = request.post();

    await LocalUsuario.query().where("user_id", user.id).delete();

    if (locais && locais.length > 0) {
      await user.locais().attach(locais);
    }

    return response.status(201).json({
      id: user.id,
      username: user.username,
      nome: user.nome,
      tipo: user.tipo,
      empresa_id: user.empresa_id,
    });
  }

  async destroy({ params }) {
    const user = await User.find(params.id);

    await user.delete();
  }
}

module.exports = UserController;
