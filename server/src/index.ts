import express from 'express'
const cors = require('cors')

const app = express()
app.use(cors())

const http = require('http').Server(app)
const socketio = require('socket.io')

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('start')
})

const server = http.listen(4000, () => {
  console.log('listening on *:4000')
})

const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket: any) => {
  console.log('a user connected!')
  // console.log(socket)

  socket.on('message', function (message: any) {
    console.log(message)
  })
})
