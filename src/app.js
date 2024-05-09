require ("dotenv").config()
import { port } from './config/config.js'
import app from './index.js'
import { Server } from 'socket.io'

const httpServer = app.listen(port, () => {
    console.log(`Servidor iniciado en la url http://localhost:${port} puerto ${port}`)
})

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log(`Nueva conexion ${socket.id}`)
})