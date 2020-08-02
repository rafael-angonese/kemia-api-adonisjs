'use strict'

const User = use('App/Models/User')

class UserController {

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
    

}

module.exports = UserController
