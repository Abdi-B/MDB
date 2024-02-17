const { MongoClient } = require('mongodb');
const express = require('express')

const app = express()

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'AB'; // Replace 'myDatabase' with your database name

// Use the connect method to connect to the server
MongoClient.connect(url,  (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected successfully to the server');

  const db = client.db(dbName); // Get the database object
  console.log(db)

  // Use the 'db' object to interact with a collection
  const collection1 = db.collection('books'); // Replace 'myCollection' with your collection name
  console.log(collection1)
  // Perform operations on the collection
  // For example, insert a document
//   collection.insertOne({ name: 'John', age: 30 }, (insertErr, result) => {
//     if (insertErr) {
//       console.error('Error inserting document:', insertErr);
//     } else {
//       console.log('Inserted document:', result.ops[0]);
//     }

//     // Close the connection after operations
//     client.close();
//   });
});



app.get('/books', (req, res) => {
  
  let books1 = []
  
  db.collection('books')
      .find() // cursor toArray forEach
      .sort({ category: 1 })
      .forEach(book => books1.push(book))
      .then(() => {
        res.status(200).json(books1)
      })
      .catch(() => {
          res.status(500).json({error: ' Could not fetch the documents '})
      })
  
      res.json({msg: "welcome to the api"})
  })

  // module.exports = {
//   connectToDb: () => {
//     return new Promise((resolve, reject) => {
//       MongoClient.connect('mongodb://localhost:27017/AB')
//         .then((client) => {
//           dbConnection = client.db('books');
//           console.log('Connected to the database');
//           // console.log(dbConnection)
//           resolve(dbConnection);
//         })
//         .catch((err) => {
//           console.log('Error connecting to the database:', err);
//           reject(err);
//         });
//     });
//   },
  

//   getDb: () => dbConnection,
  
// };