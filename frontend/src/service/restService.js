import { GetAppRounded } from "@mui/icons-material"

const POST = 'POST'
const DELETE = 'DELETE'
const GET = 'GET'

const path = 'http://localhost:3001'

const pathLogin = '/login'
const pathCreateBook = '/createBook'
const pathUpdateBook = '/updateBook'
const pathListBooks = '/listBooks'
const pathDeleteBook = '/deleteBook'
const pathRentBook = '/rentBook'
const pathListRent = '/listRents'
const pathFindBookById = '/findBookById'




async function executePOST(pathReq, data, token) {
    const params = {
        method: POST,
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        body: JSON.stringify(data)
    }
    return window.fetch(path + pathReq, params)
        .then(res => {
            if (!res.ok)
                throw new Error('Falha na comunicação com servidor')
            return res
        })
        .then(res => res.json())
}

async function executeGET(pathReq, token) {
    const params = {
        method: GET,
        headers: {
            'content-type': 'application/json',
            'token': token,
        },

    }
    return window.fetch(path + pathReq, params)
        .then(res => {
            if (!res.ok)
                throw new Error('Falha na comunicação com servidor')
            return res
        })
        .then(res => res.json())
}

async function executeDELETE(pathReq, data, token) {
    const params = {
        method: DELETE,
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        body: JSON.stringify(data)
    }
    return window.fetch(path + pathReq, params)
        .then(res => {
            if (!res.ok)
                throw new Error('Falha na comunicação com servidor')
            return res
        })
        .then(res => res.json())
}

async function login(login, password) {
    const res = await executePOST(pathLogin, { login, password })
    if (res.ok)
        return res
    else
        throw new Error(res.message)
}


async function createBook(book, token) {
    const res = await executePOST(pathCreateBook, book, token)
    if (res.ok)
        return res
    else
        throw res
}

async function updateBook(book, token) {
    let bookParam = {}
    bookParam['book'] = book
    const res = await executePOST(pathUpdateBook, bookParam, token)
    if (res.ok)
        return res
    else
        throw new Error(res.message)
}

async function listBooks(token) {
    const res = await executeGET(pathListBooks, token)
    if (res.ok)
        return res
    else
        throw new Error(res.message)
}

async function listRents(token) {
    const res = await executeGET(pathListRent, token)
    if (res.ok)
        return res
    else
        throw new Error(res.message)
}

async function deleteBook(book, token) {
    let bookParam = {}
    bookParam['id'] = book._id
    const res = await executeDELETE(pathDeleteBook, bookParam, token)
    if (res.ok)
        return res
    else
        throw new Error(res.message)
}

async function rentBook(rent, token) {
    const res = await executePOST(pathRentBook, rent, token)
    return res
}

async function findBookById(id, token) {

    const res = await executePOST(pathFindBookById, { id: id }, token)
    return res
}


export { login, createBook, updateBook, listBooks, deleteBook, rentBook, listRents, findBookById }