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

})
//.middleware('auth')