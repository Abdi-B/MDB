const express = require('express')
const {connectToDb, getDb} = require('./db')
const { ObjectId } = require('mongodb')

// init and middleware

const app = express()
app.use(express.json()) // used for post

// db connection
let db 
 connectToDb((dbConnection,err) => {
  if (dbConnection) {
    app.listen(3000, () => {
      // console.log('Connected to the database')
        console.log('app is listening on the port 3000 ')
      })
      db = getDb()
      // db = booksCollection
      // console.log(db)
  }
})

// FETCH ALL

app.get('/department', (req, res) => {

  // PAGINATION
  const page = req.query.p || 0  // if p is null choose 0 
  const booksPerPage = 3

  let books = []
  let booksCollection = db.collection('department');
  // console.log(booksCollection)

// db.collection('books')
  booksCollection
    .find() // cursor toArray forEach
    .sort({ category: -1 })
    .skip(page * booksPerPage) // how many pages you want to skip 
    .limit(booksPerPage) // how many values per page
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
        res.status(500).json({error: ' Could not fetch the documents '})
    })

//     res.json({msg: "welcome to the api"})

})

// FETCH ONE

app.get('/department/:id', (req, res) => {

  // if (ObjectId.isValid(req.params.id)){}

  try {
  const bookId = new ObjectId(req.params.id);

  // let booksCollection = db.collection('books')
  // console.log(booksCollection)

  db.collection('department')
    .findOne({_id: bookId })
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: 'Document not found' });
      }
    })
    .catch((err) => {
      console.error('Invalid ObjectId:', err);
      res.status(500).json({error: ' Could not fetch the document '})
    });
  } catch (error) {
    console.error('Invalid ObjectId:', error);
    res.status(400).json({ error: 'Invalid ObjectId1' });
  }

})

app.post('/department', (req, res) => {
   const book = req.body

   db.collection('department')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
      })
    .catch((err) => {
     res.status(500).json({err: 'Could not to Insert a new document'})
     })
})

//DELETE

app.delete('/department/:id', (req, res) => {

  // const depId = req.params.id
  const depId = new ObjectId(req.params.id);

  if (ObjectId.isValid(depId)){
    db.collection('department')
    .deleteOne({_id: depId})
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json({err: " Could not delete a doc"})
    })
  }else {
    res.status(500).json({error: 'Not a valid doc id'})
  }
  
})

// UPDATE

app.patch('/department/:id', (req, res) => {

  // const depId = req.params.id
  const depId = new ObjectId(req.params.id);
  const updates = req.body
  // ex update is :  {"category": "zz","path": "20"}

  if (ObjectId.isValid(depId)){
    db.collection('department')
    .updateOne({_id: depId},{$set: updates})
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json({err: " Could not update a doc"})
    })
  }else {
    res.status(500).json({error: 'Not a valid doc id'})
  }
})


