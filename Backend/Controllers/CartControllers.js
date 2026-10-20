
import User from '../Models/UserModels.js'

// 1. ADD PRODUCT TO CART // userId by auth
const addToCart = async (req, res) => {
  try {
    const userId = req.userId
    const { itemId, size } = req.body

    if (!userId || !itemId || !size) {
      return res.status(400).json({
        success: false,
        message: 'User ID, product ID and size are required'
      })
    }

    const userData = await User.findById(userId)

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const cartData = userData.cartData || {}

    if (!cartData[itemId]) {
      cartData[itemId] = {}
    }

    // Increase existing quantity, or start at 1
    cartData[itemId][size] =
      (Number(cartData[itemId][size]) || 0) + 1

    userData.cartData = cartData
    userData.markModified('cartData')
    await userData.save()

    return res.status(200).json({
      success: true,
      message: 'Added to cart',
      cartData: userData.cartData
    })
  } catch (error) {
    console.error('Add cart error:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// 2. REMOVE ONE QUANTITY
const removeFromCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId)

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const { itemId, size } = req.body
    const cartData = userData.cartData || {}

    if (cartData[itemId]?.[size] > 1) {
      cartData[itemId][size] -= 1
    } else if (cartData[itemId]) {
      delete cartData[itemId][size]

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]
      }
    }

    userData.cartData = cartData
    userData.markModified('cartData')
    await userData.save()

    return res.status(200).json({
      success: true,
      message: 'Removed from cart',
      cartData: userData.cartData
    })
  } catch (error) {
    console.error('Remove cart error:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// 3. UPDATE QUANTITY
const updateCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId)

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const { itemId, size, quantity } = req.body

    if (!itemId || !size || !Number.isFinite(Number(quantity))) {
      return res.status(400).json({
        success: false,
        message: 'Valid product ID, size and quantity are required'
      })
    }

    const cartData = userData.cartData || {}
    const newQuantity = Number(quantity)

    if (newQuantity > 0) {
      if (!cartData[itemId]) {
        cartData[itemId] = {}
      }

      cartData[itemId][size] = newQuantity
    } else {
      if (cartData[itemId]) {
        delete cartData[itemId][size]

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId]
        }
      }
    }

    userData.cartData = cartData
    userData.markModified('cartData')
    await userData.save()

    return res.status(200).json({
      success: true,
      message: 'Cart updated',
      cartData: userData.cartData
    })
  } catch (error) {
    console.error('Update cart error:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// 4. GET USER CART
const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId)

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User cart',
      cartData: userData.cartData || {}
    })
  } catch (error) {
    console.error('Get cart error:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export {
  addToCart,
  removeFromCart,
  updateCart,
  getUserCart
}
