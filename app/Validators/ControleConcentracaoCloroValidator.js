'use strict'

const Antl = use('Antl')

class ControleConcentracaoCloroValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            data: 'required|date',
            hora: 'required|date',
            tratado: 'required|number',
            acao_corretiva: 'required',
            empresa_id: 'required|exists:empresas,id',
            local_id: 'required|exists:locais,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = ControleConcentracaoCloroValidator
