import { getDb } from '../utils/database.js';

export class Category {
  constructor(name) {
    this.name = name;
  }

  static getAll() {
    const db = getDb();
    return db
      .collection('categories')
      .find()
      .toArray()
      .then(data => {
        return { data }
      })
      .catch(err => {
        console.log('Category => getAll()')
        console.log(err)
      });
  }

  static deleteCategories() {
    const db = getDb();
    return db
      .collection('categories')
      .deleteMany({})
      .then(() => {
        const message = 'Categories deleted.'
        return { message }
      })
      .catch(err => {
        console.log('Categories => deleteCategories()')
        console.log(err)
      });
  }

  save() {
    const db = getDb();
    return db
      .collection('categories')
      .insertOne(this)
      .then(() => {
        return db
          .collection('categories')
          .find()
          .toArray()
          .then(data => data.map(category => category.name))
      })
      .catch(err => {
        console.log('Category => save()')
        console.log(err)
      })
  }
}