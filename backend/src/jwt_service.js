import jwt from 'jsonwebtoken'



const SENHA = process.env.SENHA_JWT
const DURACAO_TOKEN = process.env.DURACAO_TOKEN

function geraToken (login) {
  return jwt.sign({ login }, SENHA, { expiresIn: DURACAO_TOKEN })
}

function validaToken (token) {
  try {
    const dados = jwt.verify(token, SENHA)
    return dados
  } catch (e) {
    return null
  }
}

export { geraToken, validaToken }