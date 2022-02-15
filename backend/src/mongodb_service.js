import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config();

// Connection URL
const url = process.env.MONGO_URI
const COLL_BOOKS = "livros"
const COLL_USERS = "usuarios"
const COLL_RENT = "alugueis"
const DATABASE = "test"
let client
let db

const CONFIG_MONGO = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false
}
// Use connect method to connect to the Server

async function connect() {
  try {
    client = await MongoClient.connect(url, CONFIG_MONGO)
    db = client.db(DATABASE)
    console.log('conectou com o banco...')
    return db;
  } catch (e) {
    console.log(e)
    return null
  }
}

async function listBooks(token) {
  // conectar uma vez apenas, evitar lentidões
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_BOOKS)
  const books = await col.find({}).toArray();
  //console.log(usuario)
  if (books) {
    return books
  } else {
    return null
  }
}

async function listRents() {
  // conectar uma vez apenas, evitar lentidões
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_RENT)
  const books = await col.find({}).toArray();
  //console.log(usuario)
  if (books) {
    return books
  } else {
    return null
  }
}


async function findBookByTitleAndCaption(title, caption) {
  // conectar uma vez apenas, evitar lentidões
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_BOOKS)
  return await col.findOne({ "titulo": title, "subtitulo": caption })
}

async function findBookById(id) {
  // conectar uma vez apenas, evitar lentidões
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_BOOKS)
  return await col.findOne(ObjectId(id))
}


async function createBook(book) {
  let newbook = null
  try {
    if (db == null) {
      db = await connect();
    }
    const col = await db.collection(COLL_BOOKS)
    newbook = await col.insertOne(book);
  } catch (e) {
    print(e);
  };
  return newbook;
}

async function existingBook(title, caption) {
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_BOOKS)
  return await col.find({ "titulo": title, "subtitulo": caption }).count() > 0;
}

async function existingBookById(id) {
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_BOOKS)
  const book = await col.findOne(ObjectId(id))

  return book
}


async function userIsAuthorizated(login, password) {
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_USERS)
  const user = await col.findOne({ "login": login, "password": password })

  if (user) {
    console.log("Autenticado")
    return user;
  } else {
    console.log("Não autenticado")
    return null;
  }
}

async function updateBook(updatedBook) {
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_BOOKS)

  let query = { _id: ObjectId(updatedBook._id) };

  let newvalues = {
    $set: {
      autor: updatedBook.autor,
      titulo: updatedBook.titulo,
      subtitulo: updatedBook.subtitulo,
      genero: updatedBook.genero,
      numeroPaginas: updatedBook.numeroPaginas
    }
  };

  const newBook = await col.updateOne(query, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

  if (newBook) {
    return newBook;
  } else {
    return null;
  }
}

async function deleteBook(id) {
  if (db == null) {
    db = await connect();
  }

  // TODO não deletar quando alugado

  const col = await db.collection(COLL_BOOKS)

  let query = { _id: ObjectId(id) };
  let removedBooks = await col.deleteOne(query)

  return removedBooks;
}

async function rentBook(rent) {
  let rentedBook = null
  try {
    if (db == null) {
      db = await connect();
    }
    const col = await db.collection(COLL_RENT)
    rentedBook = await col.insertOne(rent);
  } catch (e) {
    print(e);
  };
  return rentedBook;
}

async function findRentedBook(id) {
  if (db == null) {
    db = await connect();
  }
  const col = await db.collection(COLL_RENT)
  return await col.findOne({ livros: { $elemMatch: { _id: id } } })
}


export { listBooks, userIsAuthorizated, createBook, updateBook, existingBook, findBookById, existingBookById, deleteBook, findRentedBook, rentBook, listRents }
