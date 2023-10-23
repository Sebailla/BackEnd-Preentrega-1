import {Router} from 'express'
import Cart from '../cart.js'

const router = Router()
const cart = new Cart()

// All Cart
router.get('/', (req, res) => {
  const allCart = cart.getCarts()
  return res.json({allCart})
})

// Cart Id
router.get('/:cid', (req, res) => {
  const cartId =  cart.getCartById(parseInt(req.params.cid))
  return res.json({cartId})
})

// Add Cart
router.post('/', (req, res) => {
  const cartProduct = cart.createCart()
  return res.json({cartProduct})
})

router.post('/:cid/product/:pid', (req, res) => {
  const {cid, pid} = req.params
  const addProduct = cart.addProductoToCart(parseInt(cid), parseInt(pid))
  return res.json({addProduct})
})


export default router