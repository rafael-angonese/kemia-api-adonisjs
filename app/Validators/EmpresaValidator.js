'use strict'

const Antl = use('Antl')

class EmpresaValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            nome: 'required',
            descricao: 'required'
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = EmpresaValidator
