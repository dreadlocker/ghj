import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ObjectId } from 'bson';
import { Product } from '../models/product.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.getAll()
    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    const message = "Can't get products!"
    return res.status(400).json({ message })
  }
}

const createProduct = async (req, res) => {
  const body = Object.keys(req.body)

  // Check if 'text' is sent or 'image'
  if (body.length > 0) {
    const { category, brandName, price } = JSON.parse(body[0])
    const product = new Product(category, brandName, price)

    try {
      const data = await product.save()
      const products = data.map(product => {
        delete product._id
        return product
      })
      return res.status(201).json(products)
    } catch (error) {
      console.log(error)
      const message = "Can't create a product!"
      return res.status(400).json({ message })
    }
  } else {
    const data = await Product.getAll()
    const products = data.products
    const lastItem = products[products.length - 1]

    if (lastItem.imageUrl === null) {
      const productId = lastItem._id.toString()
      const { brandName, price } = lastItem
      const imageUrl = req.file.path.replace('\\', '/')
      const products = await Product.updateById(productId, brandName, price, imageUrl)
      return res.status(201).json(products)
    } else {
      const err = 'Already has an image!'
      console.log(err)
      throw new Error(err)
    }
  }
}

const deleteProduct = async (req, res) => {
  const { productId } = req.params

  try {
    const { message, imageUrl } = await Product.deleteById(productId)
    const __filename = fileURLToPath(import.meta.url);
    // directory of this current file
    const __dirname = dirname(__filename);

    try {
      fs.unlinkSync(path.join(__dirname, '../', imageUrl))
    } catch (err) {
      console.log('unlinkSync')
      console.error(err)
    }

    return res.status(200).json(message)
  } catch (error) {
    console.log(error)
    const message = "Can't delete a product!"
    return res.status(400).json({ message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const body = Object.keys(req.body)
    if (body.length > 0) {
      const { brandName, price } = JSON.parse(body[0])
      const message = await Product.updateById(productId, brandName, price)
      return res.status(201).json(message)
    } else {

    }

  } catch (error) {
    console.log(error)
    const message = "Can't update a product!"
    return res.status(400).json({ message })
  }
}

export default {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
}