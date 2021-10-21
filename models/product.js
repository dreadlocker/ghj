import { ObjectId } from 'bson';
import { getDb } from '../utils/database.js';

export class Product {
  constructor(category, brandName, price, imageUrl) {
    this.category = category;
    this.brandName = brandName;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  static async getAll() {
    const db = getDb();
    try {
      const products = await db.collection('products').find().toArray()
      return { products }
    } catch (_) {
      const message = "Can't getAll products!"
      return { message }
    }
  }

  static deleteById(productId) {
    const db = getDb();
    let imageUrl = ''

    db
      .collection('products')
      .findOne({ _id: ObjectId(productId) })
      .then((product) => {
        imageUrl = product.imageUrl
        return this
      })

    return db
      .collection('products')
      .deleteOne({ _id: ObjectId(productId) })
      .then(() => {
        const message = 'Product deleted.'
        return { message, imageUrl }
      })
      .catch(err => {
        console.log('Product => deleteById()')
        console.log(err)
      });
  }

  static updateById(productId, brandName, price, imageUrl) {
    const newSet = {}
    if (price !== 0) newSet.price = price
    if (brandName !== '') newSet.brandName = brandName
    if (imageUrl) newSet.imageUrl = imageUrl

    const db = getDb();
    return db
      .collection('products')
      .findOneAndUpdate(
        { _id: ObjectId(productId) },
        {
          $set: newSet
        },
      )
      .then(() => {
        return db
          .collection('products')
          .find()
          .toArray()
      })
      .catch(err => {
        console.log('Product => updateById()')
        console.log(err)
      });
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(() => {
        return db
          .collection('products')
          .find()
          .toArray()
      })
      .catch(err => {
        console.log('Product => save()')
        console.log(err)
      })
  }
}