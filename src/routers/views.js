import { Router } from 'express'
import __dirname from '../utils.js'
import ProductManager from '../productManager.js'

const products = new ProductManager('products.json')

const router = Router()

router.get('/products', (req, res) => {
  const prod = products.getProduct()
  return res.render('home', {products: prod, title: 'Productos'})
})

router.get('/realtimeproducts', (req, res) => {
  return res.render('realTimeProducts', {title:'Productos en tiempo real'})
})

router.get('*', (req, res) => {
  return res.render('404')
})

export default router