'use strict'

const Antl = use('Antl')

class UserRequest {

  get validateAll() {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users,username',
      senha: 'required',
      nome: 'required',
      tipo: 'required|integer',
    }
  }

  get messages() {
    return Antl.list('validation')
  }

}

module.exports = UserRequest
