'use strict'

const Antl = use('Antl')

class UserStoreValidator {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|unique:users,username',
      senha: 'required',
      nome: 'required',
      tipo: 'required|integer',
      empresa_id: 'required|exists:empresas,id',
    }
  }

  get messages() {
    return Antl.list('validation')
  }

}

module.exports = UserStoreValidator
