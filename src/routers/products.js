import {Router} from 'express'
import ProductManager from '../productManager.js'

const router = Router()

const products = new ProductManager('products.json')

router.get('/', (req, res) => {
  
  const { limit } = req.query

    const data = products.getProduct()

  let limitPro

  if (limit) {
    limitPro = data.slice(0, limit)
    return res.send(limitPro)
  } else { res.json({data}) }
})

router.get('/:pid', (req, res) => {
  const {pid} = req.params
  return res.json(products.getProductById(parseInt(pid)))
})

router.post('/', (req, res) => {
  const {title, description, price, thumbnail, code, stock, category, status} = req.body
  const addProduct = products.addProduct(title, description, price, thumbnail, code, stock, category, status)
  
  return res.json({addProduct})
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const updateProduct = products.updateProduct(parseInt(id), req.body)
  return res.json({updateProduct})
})

router.delete('/:id', (req, res) => {
  const {id} = req.params
  const delProduct = products.deleteProduct(parseInt(id))
  return res.json({delProduct})
})

export default router
