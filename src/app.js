import express from 'express'
import products from './routers/products.js'
import cart from './routers/cart.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  return res.send('<h1> Pre Entrega 1 - Proyecto final \n Sebastián Illa </h1>')
})

// Router Products

app.use('/', products)

// Router Cart 

app.use('/', cart)


app.listen(8080, () => { console.log('listening on port 8080 ...') })