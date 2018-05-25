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
    const posts = await Post.all()
    response.send(posts)
  }

  async details({ params, response }) {
    const post = await Post.find(params.id)
    response.send(post)
  }

  async create({ request, response }) {
    // do validation

    const post = new Post()
    post.title = request.post().title
    post.body = request.post().body
    await post.save()
  }
}

module.exports = PostController
