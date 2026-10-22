
import React, {
  createContext,
  useEffect,
  useState
} from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [products, setProducts] = useState([])

  const currency = '₹'
  const deliveryFee = 40

  const navigate = useNavigate()

  // 1. FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/product/list`
      )

      if (data.success) {
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error(
        'Fetch products error:',
        error.response?.data || error.message
      )
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // 2. FETCH USER CART
  const getUserCart = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setCartItems({})
      return
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      )

      if (data.success) {
        setCartItems(data.cartData || {})
        console.log('Cart fetched:', data.cartData)
      }
    } catch (error) {
      console.error(
        'Get cart error:',
        error.response?.data || error.message
      )
    }
  }

  useEffect(() => {
    getUserCart()
  }, [])

  // 3. ADD PRODUCT TO CART
  const addToCart = async (itemId, size) => {
    if (!size) {
      alert('Please select Size')
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login first')
      navigate('/login')
      return
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { token } }
      )

      console.log('Add cart response:', data)

      if (data.success) {
        if (data.cartData) {
          setCartItems(data.cartData)
        } else {
          await getUserCart()
        }

        navigate('/cart')
      } else {
        alert(data.message || 'Unable to add product')
      }
    } catch (error) {
      console.error(
        'Add cart error:',
        error.response?.data || error.message
      )
    }
  }

  // 4. UPDATE QUANTITY IN BACKEND
  const updateCart = async (itemId, size, quantity) => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/cart/update`,
        {
          itemId,
          size,
          quantity: Number(quantity)
        },
        { headers: { token } }
      )

      console.log('Update cart response:', data)

      if (data.success) {
        if (data.cartData) {
          setCartItems(data.cartData)
        } else {
          await getUserCart()
        }
      } else {
        console.error('Cart update failed:', data.message)
      }
    } catch (error) {
      console.error(
        'Update cart error:',
        error.response?.data || error.message
      )
    }
  }

  // 5. REMOVE ONE QUANTITY
  const removeFromCart = async (itemId, size) => {
    const currentQuantity =
      Number(cartItems[itemId]?.[size]) || 0

    if (currentQuantity <= 0) return

    await updateCart(
      itemId,
      size,
      currentQuantity - 1
    )
  }

  // 6. GET CART COUNT
  const getCartCount = () => {
    let count = 0

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += Number(cartItems[itemId][size]) || 0
      }
    }

    return count
  }

  // 7. GET CART TOTAL
  const getCartAmount = () => {
    let amount = 0

    for (const itemId in cartItems) {
      const product = products.find(
        item => String(item._id) === String(itemId)
      )

      if (!product) continue

      for (const size in cartItems[itemId]) {
        const quantity =
          Number(cartItems[itemId][size]) || 0

        amount += Number(product.price) * quantity
      }
    }

    return amount
  }

  // 8. CLEAR LOCAL CART
  const clearCart = () => {
    setCartItems({})
  }

  // 9. SHARE DATA WITH COMPONENTS
  const value = {
    currency,
    backendUrl,
    deliveryFee,
    products,
    setProducts,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCart,
    getCartCount,
    getCartAmount,
    getUserCart,
    clearCart
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
