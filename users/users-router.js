const express = require('express')
const {
  checkUserId,
  checkUserData,
} = require('../middleware/user-middleware.js')
const users = require('./users-model')

const router = express.Router()

router.get('/users', (req, res) => {
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
  }

  users
    .find(options)
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error retrieving the users',
      })
    })
})

router.get('/users/:id', checkUserId(), (req, res) => {
  res.status(200).json(req.user)
})

router.post('/users', checkUserData(), (req, res) => {
  users
    .add(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error adding the user',
      })
    })
})

router.put('/users/:id', checkUserData(), checkUserId(), (req, res) => {
  users
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: 'The user could not be found',
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error updating the user',
      })
    })
})

router.delete('/users/:id', checkUserId(), (req, res) => {
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'The user has been nuked',
        })
      } else {
        res.status(404).json({
          message: 'The user could not be found',
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Error removing the user',
      })
    })
})

router.get('/users/:id/posts', checkUserId(), (req, res) => {
  users
    .findUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Could not get user posts',
      })
    })
})

router.get('/users/:id/posts/:postId', checkUserId(), (req, res) => {
  users
    .findUserPostById(req.params.id, req.params.postId)
    .then((post) => {
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({
          message: 'Post was not found',
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Could not get user post',
      })
    })
})

router.post('/users/:id/posts', checkUserData(), checkUserId(), (req, res) => {
  users
    .addUserPost(req.params.id, req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Could not create user post',
      })
    })
})

module.exports = router
