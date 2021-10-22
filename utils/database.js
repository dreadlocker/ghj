import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
let _db;

export const mongoConnect = (callback) => {
  MongoClient
    .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@shop.1y8xd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(client => {
      _db = client.db();
      callback()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!';
}
