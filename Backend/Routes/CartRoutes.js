
import express from 'express'
import authUser from '../middleware/authUser.js'

import {
  addToCart,
  removeFromCart,
  updateCart,
  getUserCart
} from '../Controllers/CartControllers.js'

const cartRouter = express.Router()

cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/remove', authUser, removeFromCart)
cartRouter.post('/update', authUser, updateCart)
cartRouter.post('/get', authUser, getUserCart)

export default cartRouter