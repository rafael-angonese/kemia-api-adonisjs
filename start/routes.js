'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Route.post('/register', 'AuthController.register').validator('Register')
Route.post('/authenticate', 'AuthController.authenticate').validator('AuthenticateRequest')


Route.group(() => {

  //User
  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.show')
  Route.post('/users/store', 'UserController.store').validator('UserStoreValidator')
  Route.put('/users/:id', 'UserController.update').validator('UserUpdateValidator')
  Route.delete('/users/:id', 'UserController.destroy')

  //Empresa
  Route.get('/empresas', 'EmpresaController.index')
  Route.get('/empresas/:id', 'EmpresaController.show')
  Route.post('/empresas/store', 'EmpresaController.store').validator('EmpresaValidator')
  Route.put('/empresas/:id', 'EmpresaController.update').validator('EmpresaValidator')
  Route.delete('/empresas/:id', 'EmpresaController.destroy')

  //Local
  Route.get('/locais', 'LocalController.index')
  Route.get('/locais/:id', 'LocalController.show')
  Route.post('/locais/store', 'LocalController.store').validator('LocalValidator')
  Route.put('/locais/:id', 'LocalController.update').validator('LocalValidator')
  Route.delete('/locais/:id', 'LocalController.destroy')

  //Equipamento
  Route.get('/equipamentos', 'EquipamentoController.index')
  Route.get('/equipamentos/:id', 'EquipamentoController.show')
  Route.post('/equipamentos/store', 'EquipamentoController.store').validator('EquipamentoValidator')
  Route.put('/equipamentos/:id', 'EquipamentoController.update').validator('EquipamentoValidator')
  Route.delete('/equipamentos/:id', 'EquipamentoController.destroy')

  //Tanque
  Route.get('/tanques', 'TanqueController.index')
  Route.get('/tanques/:id', 'TanqueController.show')
  Route.post('/tanques/store', 'TanqueController.store').validator('TanqueValidator')
  Route.put('/tanques/:id', 'TanqueController.update').validator('TanqueValidator')
  Route.delete('/tanques/:id', 'TanqueController.destroy')

  //Controle Coleta
  Route.get('/controle-coletas', 'ControleColetaController.index')
  Route.get('/controle-coletas/:id', 'ControleColetaController.show')
  Route.post('/controle-coletas/store', 'ControleColetaController.store').validator('ControleColetaValidator')
  Route.put('/controle-coletas/:id', 'ControleColetaController.update').validator('ControleColetaValidator')
  Route.delete('/controle-coletas/:id', 'ControleColetaController.destroy')

  //Controle Od
  Route.get('/controle-ods', 'ControleOdController.index')
  Route.get('/controle-ods/:id', 'ControleOdController.show')
  Route.post('/controle-ods/store', 'ControleOdController.store').validator('ControleOdValidator')
  Route.put('/controle-ods/:id', 'ControleOdController.update').validator('ControleOdValidator')
  Route.delete('/controle-ods/:id', 'ControleOdController.destroy')

  //Controle Ph
  Route.get('/controle-phs', 'ControlePhController.index')
  Route.get('/controle-phs/:id', 'ControlePhController.show')
  Route.post('/controle-phs/store', 'ControlePhController.store').validator('ControlePhValidator')
  Route.put('/controle-phs/:id', 'ControlePhController.update').validator('ControlePhValidator')
  Route.delete('/controle-phs/:id', 'ControlePhController.destroy')

  //Controle Ss
  Route.get('/controle-sses', 'ControleSsController.index')
  Route.get('/controle-sses/:id', 'ControleSsController.show')
  Route.post('/controle-sses/store', 'ControleSsController.store').validator('ControleSsValidator')
  Route.put('/controle-sses/:id', 'ControleSsController.update').validator('ControleSsValidator')
  Route.delete('/controle-sses/:id', 'ControleSsController.destroy')

  //Controle Vazao
  Route.get('/controle-vazaos', 'ControleVazaoController.index')
  Route.get('/controle-vazaos/:id', 'ControleVazaoController.show')
  Route.post('/controle-vazaos/store', 'ControleVazaoController.store').validator('ControleVazaoValidator')
  Route.put('/controle-vazaos/:id', 'ControleVazaoController.update').validator('ControleVazaoValidator')
  Route.delete('/controle-vazaos/:id', 'ControleVazaoController.destroy')

  //Controle Tanque
  Route.get('/controle-tanques', 'ControleTanqueController.index')
  Route.get('/controle-tanques/:id', 'ControleTanqueController.show')
  Route.post('/controle-tanques/store', 'ControleTanqueController.store').validator('ControleTanqueValidator')
  Route.put('/controle-tanques/:id', 'ControleTanqueController.update').validator('ControleTanqueValidator')
  Route.delete('/controle-tanques/:id', 'ControleTanqueController.destroy')

  //Controle Bomba
  Route.get('/controle-bombas', 'ControleBombaController.index')
  Route.get('/controle-bombas/:id', 'ControleBombaController.show')
  Route.post('/controle-bombas/store', 'ControleBombaController.store').validator('ControleBombaValidator')
  Route.put('/controle-bombas/:id', 'ControleBombaController.update').validator('ControleBombaValidator')
  Route.delete('/controle-bombas/:id', 'ControleBombaController.destroy')

  //Equipamento Manutencao
  Route.get('/equipamento-manutencaos', 'EquipamentoManutencaoController.index')
  Route.get('/equipamento-manutencaos/:id', 'EquipamentoManutencaoController.show')
  Route.post('/equipamento-manutencaos/store', 'EquipamentoManutencaoController.store').validator('EquipamentoManutencaoValidator')
  Route.put('/equipamento-manutencaos/:id', 'EquipamentoManutencaoController.update').validator('EquipamentoManutencaoValidator')
  Route.delete('/equipamento-manutencaos/:id', 'EquipamentoManutencaoController.destroy')

  //Controle Concentracao Cloro
  Route.get('/controle-concentracao-cloros', 'ControleConcentracaoCloroController.index')
  Route.get('/controle-concentracao-cloros/:id', 'ControleConcentracaoCloroController.show')
  Route.post('/controle-concentracao-cloros/store', 'ControleConcentracaoCloroController.store').validator('ControleConcentracaoCloroValidator')
  Route.put('/controle-concentracao-cloros/:id', 'ControleConcentracaoCloroController.update').validator('ControleConcentracaoCloroValidator')
  Route.delete('/controle-concentracao-cloros/:id', 'ControleConcentracaoCloroController.destroy')

  //Controle Pastilha Cloro
  Route.get('/controle-pastilha-cloros', 'ControlePastilhaCloroController.index')
  Route.get('/controle-pastilha-cloros/:id', 'ControlePastilhaCloroController.show')
  Route.post('/controle-pastilha-cloros/store', 'ControlePastilhaCloroController.store').validator('ControlePastilhaCloroValidator')
  Route.put('/controle-pastilha-cloros/:id', 'ControlePastilhaCloroController.update').validator('ControlePastilhaCloroValidator')
  Route.delete('/controle-pastilha-cloros/:id', 'ControlePastilhaCloroController.destroy')


})
//.middleware('auth')