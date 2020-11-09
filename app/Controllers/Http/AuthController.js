'use strict'

const User = use('App/Models/User')

class AuthController {

    async authenticate({ request, auth, response }) {

        const { username, senha } = request.all()

        try {

            let token = await auth.attempt(username, senha)

            token.user = await User.query().select('id', 'nome', 'tipo', 'empresa_id').with('empresa').where('username', username).first()

            return token

        } catch (e) {
            response.unauthorized(
                [{
                    field: "senha",
                    message: "Senha inválida"
                }]
            )
        }
    }

}

module.exports = AuthController
