'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('title', 255)
      table.string('body')
      table.timestamps()
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostsSchema
