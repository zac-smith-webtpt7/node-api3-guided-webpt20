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

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
