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

  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.show')
  Route.post('/users/store', 'UserController.store').validator('UserRequest')
  Route.put('/users/:id', 'UserController.update').validator('UserRequest')
  Route.delete('/users/:id', 'UserController.destroy')

}).middleware('auth')