import { User } from '../models/user.js';

const getUser = async (req, res) => {
  const { username, password } = req.query
  if (!username || !password) {
    throw new Error()
  }

  try {
    const response = await User.getUser(username, password)
    if (response.isAuth) {
      return res.status(200).json({ isAuth: true })
    } else {
      throw new Error('User not found!')
    }
  } catch (error) {
    console.log(error)
    const message = "Can't get user!"
    return res.status(400).json({ message })
  }
}

const createUser = async (req, res) => {
  const { username, password } = req.body
  const user = new User(username, password)

  try {
    const message = await user.save()
    return res.status(201).json(message)
  } catch (error) {
    console.log(error)
    const isAuth = false
    return res.status(400).json({ isAuth })
  }
}

export default {
  getUser,
  createUser,
}