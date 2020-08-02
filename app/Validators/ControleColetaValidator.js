'use strict'

const Antl = use('Antl')

class ControleColetaValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            data: 'required|date',
            status_coleta: 'required|number',
            condicao_coleta: 'required|number',
            empresa_id: 'required|exists:empresas,id',
            local_id: 'required|exists:locais,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = ControleColetaValidator
