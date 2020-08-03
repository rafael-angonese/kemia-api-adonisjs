'use strict'

const { rule } = use('Validator')

const Antl = use('Antl')

class ControleTanqueValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            data: 'required|date',
            hora: 'required|date',
            tempo_ligado_2cv: 'required',
            tempo_desligado_2cv: 'required',
            tempo_ligado_5cv: 'required',
            tempo_desligado_5cv: 'required',
            acao_corretiva: 'required',
            empresa_id: 'required|exists:empresas,id',
            tanque_id: 'required|exists:tanques,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = ControleTanqueValidator
