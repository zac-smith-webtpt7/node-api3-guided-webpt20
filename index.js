const express = require('express')
const morgan = require('morgan')
const welcomeRouter = require('./welcome/welcome-router')
const usersRouter = require('./users/users-router')
const { deny } = require('./middleware/middleware.js')

const server = express()
const port = 4000

server.use(express.json())
server.use(deny())
// server.use(morgan('combined')) // third party middleware

server.use((req, res, next) => {
  const time = new Date().toISOString()
  console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`)
  next()
})

server.use(welcomeRouter)
server.use(usersRouter)

// server.usr((err, req, res, next) => {
//   console.log(err)
//   res.status(500).json({
//     message: 'Something went wrong, please try again later.',
//   })
// })

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
