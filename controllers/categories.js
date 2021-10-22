import { Category } from '../models/category.js';

const getCategories = (req, res) => {
  Category.getAll()
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(err => {
      console.log('categories => getCategories()')
      console.log(err)
    });
}

const createCategory = (req, res) => {
  const { name } = JSON.parse(Object.keys(req.body)[0])
  const category = new Category(name)
  category
    .save()
    .then(result => {
      return res.status(201).json(result)
    })
    .catch(err => {
      console.log('categories => createCategory()')
      console.log(err)
    })
}

const deleteAllCategories = async (_, res) => {
  try {
    await Category.deleteCategories()
    return res.status(200).json([])
  } catch (error) {
    console.log(error)
    const message = "Can't delete all categories!"
    return res.status(400).json({ message })
  }
}

export default {
  getCategories,
  createCategory,
  deleteAllCategories,
}