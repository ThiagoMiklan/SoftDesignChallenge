import React, { useState, useEffect } from 'react'
import { Button, ButtonList } from 'assemble-react-bulma'
import CreateBook from './CreateBook'
import Rent from './Rent'
import Login from './Login'

function onClickTeste() {
  alert('clicou')
}

function App() {

  const [state, setState] = useState({ token: '', message: '', auth: false, component: <Login change={change} /> })

  function change(newToken, newMessage, isAuth) {
    setState({ token: newToken, mensagem: newMessage, auth: isAuth, component: <Rent token={newToken}></Rent> })
  }

  return <div>
    {state.component}
  </div>
}

export default App;
