'use strict'

const Antl = use('Antl')

class LagoaValidator {

    get validateAll() {
        return true
    }

    get rules() {
      return {
          nome: 'required',
          descricao: 'required',
          is_ph: 'required',
          is_od: 'required',
          is_ss: 'required',
          is_aeracao: 'required',
          is_observacao: 'required',
          empresa_id: 'required|exists:empresas,id',
          local_id: 'required|exists:locais,id',
      }
  }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = LagoaValidator
