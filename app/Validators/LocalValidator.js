'use strict'

const Antl = use('Antl')

class LoccalValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            nome: 'required',
            descricao: 'required',
            endereco: 'required',
            empresa_id: 'required|exists:empresas,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = LoccalValidator
