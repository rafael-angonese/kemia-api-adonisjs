'use strict'

const Antl = use('Antl')

class AuthenticateRequest {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|exists:users,username',
      senha: 'required',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
  // get messages () {
  //   return {
  //     'username.required': 'O nome de usuário é obrigatório',
  //     'username.exists': 'O nome de usuário não existe',
  //     'senha.required': 'O senha é obrigatório',
  //   }
  // }

}

module.exports = AuthenticateRequest
