'use strict'

const User = use('App/Models/User')

class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }

  async register({ request, response }) {
    const { email, password } = request.all()
    const user = await User.create({
      email,
      password,
      username: email
    })

    response.send(user)
  }
}

module.exports = UserController
