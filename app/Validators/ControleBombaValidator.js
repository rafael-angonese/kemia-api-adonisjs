'use strict'

const Antl = use('Antl')

class ControleBombaValidator {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            data: 'required|date',
            hora: 'required|date',
            leitura: 'required|number',
            corrente: 'required|number',
            acao_corretiva: 'required',
            empresa_id: 'required|exists:empresas,id',
            local_id: 'required|exists:locais,id',
            equipamento_id: 'required|exists:equipamentos,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = ControleBombaValidator
