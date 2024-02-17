const { MongoClient } = require('mongodb')
const mongoose = require("mongoose");
require('dotenv').config()


let dbConnection 
let uri = process.env.MONGO_URI

module.exports = {
    connectToDb: (cb) => {
      // MongoClient.connect("mongodb://localhost:27017/AB")
      MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db()
        
        //  const booksCollection = client.db('AB').collection('books');
         
        console.log('Connected to the database');
        return (cb(dbConnection))
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
    },

    getDb: () => dbConnection
}
