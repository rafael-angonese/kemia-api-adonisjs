'use strict'

const Antl = use('Antl')

class EquipamentoManutencaoValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            saida: 'required|date',
            retorno: 'date',
            problema: 'required',
            empresa_id: 'required|exists:empresas,id',
            local_id: 'required|exists:locais,id',
            equipamento_id: 'required|exists:equipamentos,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = EquipamentoManutencaoValidator
