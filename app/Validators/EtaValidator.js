'use strict'

const Antl = use('Antl')

class EtaValidator {

    get validateAll() {
        return true
    }

    get rules() {
      return {
          nome: 'required',
          descricao: 'required',
          is_vazao: 'required',
          is_ph: 'required',
          is_pac: 'required',
          is_polimero: 'required',
          is_hipoclorito: 'required',
          is_observacao: 'required',
          empresa_id: 'required|exists:empresas,id',
          local_id: 'required|exists:locais,id',
      }
  }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = EtaValidator
