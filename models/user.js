import { ObjectId } from 'bson';
import { getDb } from '../utils/database.js';

export class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static async getUser(username, password) {
    const db = getDb();
    try {
      return await db
        .collection('users')
        .findOne({ username, password })
        .then((data) => {
          let isAuth = false
          if (data !== null) {
            isAuth = true
            return { isAuth }
          } else {
            throw new Error()
          }
        })
    } catch (_) {
      const message = "Can't getUser!"
      return { message }
    }
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then(() => {
        const message = 'User created.'
        return { message }
      })
      .catch(err => {
        const message = "Can't create User!"
        return { message }
      })
  }
}