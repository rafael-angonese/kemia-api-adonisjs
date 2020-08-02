'use strict'

const { rule } = use('Validator')


// import { date } from 'indicative/builds/validations'

const Antl = use('Antl')

class ControleOdValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            data: 'required|date',
            hora: 'required|date',
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

module.exports = ControleOdValidator
