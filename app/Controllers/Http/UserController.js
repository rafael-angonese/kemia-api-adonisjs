'use strict'

const User = use('App/Models/User')

class UserController {

    async index({ request, auth, response }) {

        let auth_user = await auth.getUser()

        const users = await User.query()
            .where('empresa_id', auth_user.empresa_id)
            .select('id', 'username', 'nome', 'tipo', 'empresa_id')
            .with('empresa')
            .with('locais')
            .fetch()

        return users
    }

    async show({ params }) {

        const user = await User.query()
            .where('id', params.id)
            .select('id', 'username', 'nome', 'tipo', 'empresa_id')
            .with('empresa')
            .with('locais')
            .first()

        //await user.load('empresa')

        return user
    }

    async store({ request, response }) {
        const data = request.only([
            'username',
            'nome',
            'senha',
            'tipo',
            'empresa_id',
        ])

        const user = await User.create(data)

        const { locais } = request.post()
    
        if (locais && locais.length > 0) {
          await user.locais().attach(locais)
        }

        return response.status(201).json({
            id: user.id,
            username: user.username,
            nome: user.nome,
            tipo: user.tipo,
            empresa_id: user.empresa_id,
        })
    }

    async update({ request, params, response }) {

        const data = request.only([
            'username',
            'nome',
            'tipo',
            'empresa_id',
        ])

        const user = await User.find(params.id)

        user.merge(data)

        await user.save()

        const { locais } = request.post()
    
        if (locais && locais.length > 0) {
          await user.locais().detach()
          await user.locais().attach(locais)
        }

        return response.status(201).json({
            id: user.id,
            username: user.username,
            nome: user.nome,
            tipo: user.tipo,
            empresa_id: user.empresa_id,
        })
    }

    async destroy({ params }) {

        const user = await User.find(params.id)

        await user.delete()

    }

}

module.exports = UserController
