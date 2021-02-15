"use strict";

const Tarefa = use("App/Models/Tarefa");

const { addDays, addMonths, isAfter, eachDayOfInterval } = require("date-fns");
const { format } = require("date-fns-tz");
const { utcToZonedTime } = require("date-fns-timezone");

class TarefaController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const tarefas = await Tarefa.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("user", (q) => {
        return q.select("id", "nome");
      })
      .fetch();

    return tarefas;
  }

  async operador({ request }) {
    let { localId, userId, startDate, endDate } = request.all();

    const tarefas = await Tarefa.query()
      .where("local_id", localId)
      .where("user_id", userId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return tarefas;
  }

  async show({ params }) {
    const tarefa = await Tarefa.find(params.id);

    await tarefa.load('user', queryBuildeder => {
      queryBuildeder.select('id', 'nome');
    })
    await tarefa.load('local')

    return tarefa;
  }

  async store({ request, response }) {
    let {
      data,
      atividade,
      user_id,
      local_id,
      empresa_id,
      replicar,
      intervalo,
      ate,
    } = request.all();

    await Tarefa.create({
      data: data,
      atividade: atividade,
      local_id: local_id,
      empresa_id: empresa_id,
      user_id: user_id,
    });

    if (replicar == true) {
      // todoas os dias
      if (intervalo == 1) {

        const [year, month, day] = data.split("-");
        let data_inicio = new Date(year, month -1, day);

        const [y, m, d] = ate.split("-");
        let data_final = new Date(y, m -1 , d);

        let data_atual = addDays(data_inicio, 1);

        // var result = eachDayOfInterval({
        //   start: data,
        //   end: ate,
        // });


        while (data_atual <= data_final) {
          await Tarefa.create({
            data: data_atual,
            atividade: atividade,
            local_id: local_id,
            empresa_id: empresa_id,
            user_id: user_id,
          });

          data_atual = addDays(data_atual, 1);
        }
      }

      // uma vez por semana
      if (intervalo == 2) {
        const [year, month, day] = data.split("-");
        let data_inicio = new Date(year, month -1, day);

        const [y, m, d] = ate.split("-");
        let data_final = new Date(y, m -1, d);

        let data_atual = addDays(data_inicio, 7);

        while (data_atual <= data_final) {
          await Tarefa.create({
            data: data_atual,
            atividade: atividade,
            local_id: local_id,
            empresa_id: empresa_id,
            user_id: user_id,
          });

          data_atual = addDays(data_atual, 7);
        }
      }

      // uma vez por mes
      if (intervalo == 3) {
        const [year, month, day] = data.split("-");
        let data_inicio = new Date(year, month - 1, day);

        const [y, m, d] = ate.split("-");
        let data_final = new Date(y, m -1, d);

        let data_atual = addMonths(data_inicio, 1);

        while (data_atual <= data_final) {
          await Tarefa.create({
            data: data_atual,
            atividade: atividade,
            local_id: local_id,
            empresa_id: empresa_id,
            user_id: user_id,
          });

          data_atual = addMonths(data_atual, 1);
        }
      }
    }

    return response.status(201).json("sdf");
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "atividade",
      "user_id",
      "local_id",
      "empresa_id",
    ]);

    const tarefa = await Tarefa.find(params.id);

    tarefa.merge(data);

    await tarefa.save();

    return tarefa;
  }

  async destroy({ params }) {
    const tarefa = await Tarefa.find(params.id);

    await tarefa.delete();
  }
}

module.exports = TarefaController;
