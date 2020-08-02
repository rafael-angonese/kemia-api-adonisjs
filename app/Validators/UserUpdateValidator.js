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
      tipo: 'required|integer',
      empresa_id: 'required|exists:empresas,id',
    }
  }

  get messages() {
    return Antl.list('validation')
  }

}

module.exports = UserUpdateValidator
