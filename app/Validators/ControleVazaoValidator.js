'use strict'

const Antl = use('Antl')

class ControleVazaoValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            data: 'required|date',
            hora: 'required|date',
            vazao_dia: 'required|number',
            empresa_id: 'required|exists:empresas,id',
            local_id: 'required|exists:locais,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = ControleVazaoValidator
