'use strict'

const Antl = use('Antl')

class EquipamentoValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            nome: 'required',
            descricao: 'required',
            empresa_id: 'required|exists:empresas,id',
            local_id: 'required|exists:locais,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = EquipamentoValidator
