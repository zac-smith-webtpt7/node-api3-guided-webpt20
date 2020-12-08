const users = require('../users/users-model.js')

const checkUserId = () => {
  return (req, res, next) => {
    users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          // set a value in the req so that it can be accessed later in the stack
          req.user = user
          next()
        } else {
          res.status(404).json({
            message: 'User not found',
          })
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: 'Error retrieving the user',
        })
      })
  }
}

const checkUserData = () => {
  return (req, res, next) => {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({
        message: 'Missing user name or email',
      })
    }
    next()
  }
}

module.exports = {
  checkUserId,
  checkUserData,
}
