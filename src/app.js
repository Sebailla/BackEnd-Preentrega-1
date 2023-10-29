import express from 'express'
import __dirname from './utils.js'
import products from './routers/products.js'
import cart from './routers/cart.js'
import viewsRouter from './routers/views.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import ProductManager from './productManager.js'

const app = express()
// Instanciamos los productos
const prod = new ProductManager('./products.json')

app.use(express.static((__dirname + '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express Server
const httpServer = app.listen(8080, () => console.log('listening on port 8080 ...'))

// WebSocket Server
const socketServer = new Server(httpServer)

// views
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// Router Products

app.use('/api/products', products)

// Router Cart 

app.use('/api/cart', cart)

//Routers Views
app.use('/', viewsRouter)

//?  WebSocket connection
socketServer.on('connection', socket => {
  console.log('New Client connected')



  socket.on('disconnect', () => {
    console.log('Cliente sin conección')
  })

  // Enviamos productos al Cliente
  socket.emit('getProducts', prod.getProduct())
  
  // Eliminamos productos
  socket.on('getProducts', (productId) => {
    prod.deleteProduct(parseInt(productId))
    socket.emit('getProducts', prod.getProduct())
  })

  // Agregamos productos
  socket.on('postProducts', (dataJson) => {
    prod.addProduct(dataJson)
    socket.emit('postProducts', prod.getProduct())
  })


})




