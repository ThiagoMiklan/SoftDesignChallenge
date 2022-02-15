import http from 'http'
//import https from 'https'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import express from 'express'
import { listBooks, userIsAuthorizated, createBook, updateBook, existingBook, findBookById, existingBookById, deleteBook, findRentedBook, rentBook, listRents } from './src/mongodb_service.js'
import { geraToken, validaToken } from './src/jwt_service.js'
import { Console } from 'console'
import cors from 'cors'

dotenv.config()

const app = express()
const PORTA = process.env.BACKEND_PORT

app.use(bodyParser.json())
app.use(cors())

app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = await userIsAuthorizated(login, password)
    if (user) {
        let token = geraToken(login)
        res.json({ ok: true, token: token, mensagem: "Usuário autenticado" })
    } else {
        res.json({ ok: false, mensagem: "Usuário não encontrado" })
    }
})

app.post('/createBook', async (req, res) => {
    const { autor, titulo, subtitulo, genero, numeroPaginas } = req.body
    const { token } = req.headers

    if (validaToken(token)) {
        let book = { autor: autor, titulo: titulo, subtitulo: subtitulo, genero: genero, numeroPaginas: numeroPaginas }
        let existBook = await existingBook(book.titulo, book.subtitulo)
        if (!existBook) {
            let newBook = await createBook(book);
            (newBook.insertedId) ? res.json({ ok: true, mensagem: "Livro inserido com sucesso!" }) : res.json({ ok: false, mensagem: "Problemas ao inserir" });
        } else {
            res.json({ ok: false, mensagem: "Livro já cadastrado" })
        }
    } else {
        res.json({ ok: false, mensagem: "Token inválido" })
    }
})

app.post('/updateBook', async (req, res) => {
    const { book } = req.body
    const { token } = req.headers
    console.log("LIVRO ANTIGO BOOK: " + JSON.stringify(book))
    if (validaToken(token)) {
        let existBook = await existingBookById(book._id)
        if (existBook._id !== undefined) {
            const newBook = await updateBook(book);
            res.json({ ok: true, mensagem: "Livro Atualizado", livroAtualizado: newBook })
        } else {
            res.json({ ok: false, mensagem: "Livro não existe" })
        }
    } else {
        res.json({ ok: false, mensagem: "Token inválido" })
    }
})

app.get('/listBooks', async (req, res) => {
    const { token } = req.headers
    if (validaToken(token)) {
        let books = await listBooks()
        res.json({ ok: true, livros: books })
    } else {
        res.json({ ok: false, mensagem: "Token inválido" })
    }
})

app.delete('/deleteBook', async (req, res) => {
    const { token } = req.headers
    const { id } = req.body


    if (validaToken(token)) {
        let existBook = await existingBookById(id)
        if (existBook == null) {
            res.json({ ok: false, mensagem: "Livro não existe" })
        } else {
            let rentedBook = await findRentedBook(id)
            if (rentedBook === null) {
                await deleteBook(id)
                res.json({ ok: true, mensagem: "Livro Excluído" })
            } else {
                res.json({ ok: false, mensagem: "Livro alugado, não é possível excluir" })
            }
        }
    } else {
        res.json({ ok: false, mensagem: "Token inválido" })
    }
})


app.get('/listRents', async (req, res) => {
    const { token } = req.headers
    if (validaToken(token)) {
        let books = await listRents()
        res.json({ ok: true, rents: books })
    } else {
        res.json({ ok: false, mensagem: "Token inválido" })
    }
})

app.post('/findBookById', async (req, res) => {
    const { token } = req.headers
    const { id } = req.body
    if (validaToken(token)) {
        let books = await findBookById(id, token)
        res.json({ ok: true, book: books })
    } else {
        res.json({ ok: false, mensagem: "Token inválido" })
    }
})

app.post('/rentBook', async (req, res) => {
    const { rent } = req.body
    const { token } = req.headers

    let rentedBooks = new Array()
    let books = rent.livros;

    for (let i = 0; i < books.length; i++) {
        let bookId = books[i]["_id"]
        let rentedBook = await findRentedBook(bookId);

        if (rentedBook !== null) {
            rentedBooks.push(books[i]);
        }
    }

    if (rentedBooks.length == 0) {
        await rentBook(rent)
        res.json({ ok: true, mensagem: "Livro alugado com sucesso" })
    } else {
        res.json({ ok: false, mensagem: "Existem livros alugados", livrosAlugados: rentedBooks })
    }

})

const server = http.createServer(app)

// eslint-disable-next-line no-console
server.listen(PORTA, () => console.log(`No ar, HTTPS porta ${PORTA}`))