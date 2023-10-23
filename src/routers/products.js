import {Router} from 'express'
import ProductManager from '../productManager.js'

const router = Router()

const products = new ProductManager('products.json')

router.get('/api/products', (req, res) => {
  
  const { limit } = req.query

    const data = products.getProduct()

  let limitPro

  if (limit) {
    limitPro = data.slice(0, limit)
    return res.send(limitPro)
  } else { res.json({data}) }
})

router.get('/api/products/:pid', (req, res) => {
  const {pid} = req.params
  return res.json(products.getProductById(parseInt(pid)))
})

router.post('/api/products', (req, res) => {
  const {title, description, price, thumbnail, code, stock, category, status} = req.body
  const addProduct = products.addProduct(title, description, price, thumbnail, code, stock, category, status)
  
  return res.json({addProduct})
})

router.put('/api/products/:id', (req, res) => {
  const {id} = req.params
  const updateProduct = products.updateProduct(parseInt(id), req.body)
  return res.json({updateProduct})
})

router.delete('/api/products/:id', (req, res) => {
  const {id} = req.params
  const delProduct = products.deleteProduct(parseInt(id))
  return res.json({delProduct})
})

export default router
