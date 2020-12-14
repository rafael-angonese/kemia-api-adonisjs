'use strict'

const Antl = use('Antl')

class TratamentoEfluenteLagoaValidator {

    get validateAll() {
        return true
    }

    get rules() {
      return {
          data: 'required',
          // ph: 'required',
          // od: 'required',
          // ss: 'required',
          // aeracao: 'required',
          // observacao: 'required',
          // nivel_lagoa: 'required',
          // bomba_recalque_funcionando: 'required',
          // observacao_geral: 'required',
          lagoa_id: 'required|exists:lagoas,id',
          empresa_id: 'required|exists:empresas,id',
          local_id: 'required|exists:locais,id',
      }
  }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = TratamentoEfluenteLagoaValidator
