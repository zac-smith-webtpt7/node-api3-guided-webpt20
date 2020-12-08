const deny = () => {
  return (req, res, next) => {
    // HOF
    // basic 50/50
    if (Math.random() < 0.5) {
      next()
    } else {
      res.status(418).json({
        message: 'nope, you can not go futher',
      })
    }
  }
}

module.exports = {
  deny,
}
