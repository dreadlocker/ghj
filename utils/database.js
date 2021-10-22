import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
let _db;

export const mongoConnect = (callback) => {
  MongoClient
    .connect(`mongodb+srv://${'Zak'}:${'Asdlkjasd1'}@shop.1y8xd.mongodb.net/${'store'}?retryWrites=true&w=majority`)
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
