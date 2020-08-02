'use strict'

const User = use('App/Models/User')

class UserController {

    async index({ request, auth, response }) {


        // try {
        //     let empresa_id = await auth.getUser().empresa_logada_id
        // } catch (error) {
        //     response.send('Missing or invalid api token')
        // }

        const users = await User.query().select('nome', 'tipo').fetch()

        return users
    }

    async show({ params }) {

        const user = await User.find(params.id)

        // await user.load('empresa')

        return user
    }

    async store({ request, response }) {
        const data = request.only([
            'username',
            'nome',
            'senha',
            'tipo',
        ])

        const user = await User.create(data)

        return response.status(201).json(user)
    }

    async update({ request, params, response }) {
        
        const data = request.only([
            'username',
            'nome',
            'tipo',
        ])

        const user = await User.find(params.id)

        user.merge(data)

        await user.save()

        return user
    }

    async destroy({ params }) {
        
        const user = await User.find(params.id)

        await user.delete()

    }

}

module.exports = UserController
