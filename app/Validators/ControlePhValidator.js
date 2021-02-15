'use strict'


const Antl = use('Antl')

class ControlePhValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            data: 'required|date',
            hora: 'required',
            bruto: 'required|number',
            reator_1: 'required|number',
            reator_2: 'required|number',
            reator_3: 'required|number',
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

module.exports = ControlePhValidator
