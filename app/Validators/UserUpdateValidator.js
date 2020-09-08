'use strict'

const Antl = use('Antl')

class UserUpdateValidator {

  get validateAll() {
    return true
  }

  get rules () {
    return {
      username: 'unique:users,username',
      nome: 'required',
      tipo: 'required',
      empresa_id: 'required|exists:empresas,id',
    }
  }

  get messages() {
    return Antl.list('validation')
  }

}

module.exports = UserUpdateValidator
