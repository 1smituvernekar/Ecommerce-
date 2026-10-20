
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  sizes: {
    type: Array,
    required: true
  },
  bestSeller: {
    type: String,
    default: 'false'
  },
  images: {
    type: [String],
    default: []
  }
})

const Product = mongoose.model('product', productSchema)

export default Product


