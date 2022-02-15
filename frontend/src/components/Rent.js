import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import CreateBook from './CreateBook';
import TableListBook from './TableListBook';
import TableListRents from './TableListRents';
import RentBook from './RentBook';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import UpgradeIcon from '@mui/icons-material/Upgrade';


const Rent = (props) => {

    const [state, setstate] = useState({ displayedComponent: <CreateBook token={props.token} /> });

    function onClickCreateBok() {
        setstate({ displayedComponent: <CreateBook token={props.token} /> })
    }

    function onClickReadBook() {
        setstate({ displayedComponent: <TableListBook token={props.token} /> })
    }

    function onClickUpdateBook() {

    }

    function onDeleteBook() {

    }

    function onReadRents() {
        setstate({ displayedComponent: <TableListRents token={props.token} /> })
    }

    function onRentBook() {
        setstate({ displayedComponent: <RentBook token={props.token} /> })
    }


    let itensSideBar = [{ text: 'Cadastrar Livros', iconComponent: <ListItemIcon><AddCircleIcon /></ListItemIcon>, onClick: onClickCreateBok },
    { text: 'Consultar Livros', iconComponent: <ListItemIcon><AutoStoriesIcon /></ListItemIcon>, onClick: onClickReadBook },
    { text: 'Alugar Livros', iconComponent: <ListItemIcon><AttachMoneyIcon /></ListItemIcon>, onClick: onRentBook },
    { text: 'Consultar Alugueis', iconComponent: <ListItemIcon><AttachMoneyIcon /></ListItemIcon>, onClick: onReadRents },
    {}]

    /*let itensSideBar = [{ text: 'Cadastrar Livros', iconComponent: <ListItemIcon><AddCircleIcon /></ListItemIcon>, onClick: onClickCreateBok },
    { text: 'Consultar Livros', iconComponent: <ListItemIcon><AutoStoriesIcon /></ListItemIcon>, onClick: onClickReadBook }]*/



    return <SideBar itensSideBar={itensSideBar} displayedComponent={state.displayedComponent} />
}


export default Rent