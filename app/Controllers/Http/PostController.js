'use strict'

const { validate } = use('Validator')
const Post = use('App/Models/Post')

// const posts = [
//   { id: 1, title: 'First', body: 'This is body 1' },
//   { id: 2, title: 'Second', body: 'This is body 2' },
//   { id: 3, title: 'Third', body: 'This is body 3' }
// ]

class PostController {
  async index({ view }) {
    return view.render('posts.index', {
      title: 'Latest posts'
    })
  }

  async all({ response }) {
    // const user = await auth.getUser()„
    // const posts = await user.posts().fetch()
    const posts = await Post.all()
    response.send(posts)
  }

  async details({ auth, params, response }) {
    const user = await auth.getUser()
    const { id } = params
    const post = await user.posts().fetch(id)
    response.send(post)
  }

  async create({ auth, request, response }) {
    // do validation

    const user = await auth.getUser()
    const { title, body } = request.all()
    const post = new Post()
    post.fill({
      title,
      body
    })
    await user.posts().save(post)
    return post
    // post.title = request.post().title
    // post.body = request.post().body
    // await post.save()
  }

  async delete({ auth, request, response, params }) {
    const user = await auth.getUser()
    const { id } = params
    const post = await PostController.find(id)
    if (post.user_id !== user.id) {
      return response.status(403)
    }
    await post.delete()
    return post
  }
}

module.exports = PostController
