'use strict'

const User = use('App/Models/User')

class AuthController {

    async authenticate({ request, auth }) {

        const { username, senha } = request.all()

        let token = await auth.attempt(username, senha)

        token.user = await User.query().select('nome', 'tipo').where('username', username).first()

        return token

    }

}

module.exports = AuthController
