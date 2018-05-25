'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')

Route.group(() => {
  // AUTH
  Route.post('auth/register', 'UserController.register')
  Route.post('auth/login', 'UserController.login')

  // POSTS
  Route.get('posts', 'PostController.all')
  Route.get('posts/:id', 'PostController.details')
  Route.post('posts', 'PostController.create')

  // TEST
  Route.get('test', () => 'Hello World')
  Route.get('test/:id', ({ params }) => `This is the id: ${params.id}`)
}).prefix('api/v1/')
