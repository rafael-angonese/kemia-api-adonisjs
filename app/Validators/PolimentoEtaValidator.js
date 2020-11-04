'use strict'

const Antl = use('Antl')

class PolimentoEtaValidator {

    get validateAll() {
        return true
    }

    get rules() {
      return {
          data: 'required',
          vazao: 'required',
          ph: 'required',
          pac: 'required',
          polimero: 'required',
          hipoclorito: 'required',
          observacao: 'required',
          ph_caixa_saida_eta: 'required',
          ss_caixa_saida_eta: 'required',
          observacao_caixa_saida_eta: 'required',
          ph_caixa_saida_final: 'required',
          ss_caixa_saida_final: 'required',
          observacao_caixa_saida_final: 'required',
          eta_id: 'required|exists:etas,id',
          empresa_id: 'required|exists:empresas,id',
          local_id: 'required|exists:locais,id',
      }
  }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = PolimentoEtaValidator
