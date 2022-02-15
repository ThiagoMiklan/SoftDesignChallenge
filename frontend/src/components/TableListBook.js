import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { listBooks, updateBook, deleteBook, rentBook } from '../service/restService'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DialogAlert from './DialogAlert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DialogBooks from './DialogBooks';
import { makeStyles } from '@material-ui/core';

let columns = [{ field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center', flex: 1 },
{ field: 'autor', headerName: 'Autor', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'titulo', headerName: 'Título', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'subtitulo', headerName: 'Subtítulo', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'genero', headerName: 'Gênero', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'numeroPaginas', headerName: 'Número Páginas', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true }]


const useStyles = makeStyles({
    button: {

        alignSelf: "center"
    }
});



const TableListBook = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({ rows: [] })

    const [stateRows, setSelectionRows] = useState({ selectedRows: [] });

    const [stateOpen, setStateOpen] = useState({ open: false })

    const [stateAlert, setStateAlert] = useState({ ok: false, message: '', open: false })

    //const [editRowsModel, setEditRowsModel] = useState({});

    const handleClose = () => {
        setStateOpen({ open: false })
    }

    const handleOnCommit = (e) => {
        const newRows = state.rows.map(row => {
            if (row.id === e.id) {
                return { ...row, [e.field]: e.value }
            } else {
                return { ...row }
            }
        })

        setState({ rows: newRows })
    }

    useEffect(() => {

        listBooks(props.token).then(list => addRows(list.livros))

    }, [])

    function addRows(books) {
        books.forEach((item, i) => {
            item['id'] = i + 1;
        });

        setState({ rows: books })

    }

    async function onClickUpdate() {
        for (let i = 0; i < state.rows.length; i++) {
            let res = await updateBook(state.rows[i], props.token)
            setStateAlert({ ok: res.ok, message: res.mensagem, open: true })
            closeAlert()
        }
    }

    async function onClickDelete() {
        setStateOpen({ open: true })
    }

    async function onClickRent() {
        for (let i = 0; i < state.rows.length; i++) {
            let res = await rentBook(state.rows[i], props.token)
            setStateAlert({ ok: res.ok, message: res.mensagem, open: true })
            closeAlert()
        }
    }

    function closeAlert() {
        setTimeout(function () {
            setStateAlert({ ok: '', message: '', open: false })
        }, 5000)
    }


    async function onConfirm() {
        handleClose()
        for (let i = 0; i < stateRows.selectedRows.length; i++) {
            for (let z = 0; z < state.rows.length; z++) {
                if (state.rows[z].id === stateRows.selectedRows[i]) {
                    let res = await deleteBook(state.rows[z], props.token)
                    setStateAlert({ ok: res.ok, message: res.mensagem, open: true })
                    closeAlert()
                }
            }

        }
        let newList = await listBooks(props.token)
        addRows(newList.livros)
    }


    return <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'stretch' }}>
            <div style={{ flexGrow: 1, height: '100%' }}>
                <DataGrid
                    rows={state.rows}
                    columns={columns}
                    sx={{ m: 5, }}
                    checkboxSelection
                    onSelectionModelChange={(newSelection) => {
                        setSelectionRows({ selectedRows: newSelection });
                    }}
                    onCellEditCommit={handleOnCommit}

                />

                <div style={{ display: 'flex', gap: '10px', alignSelf: 'center', paddingLeft: '40px' }}>
                    <Button className={classes.button} variant='contained' onClick={onClickUpdate} endIcon={<UpgradeIcon />} >Atualizar</Button>
                    <Button className={classes.button} variant='contained' onClick={onClickDelete} endIcon={<DeleteForeverIcon />} >Deletar</Button>
                    <DialogBooks open={stateOpen.open} handleClose={handleClose} onConfirm={onConfirm} message={"É necessário confirmar a exclusão"} title={'Confirmar Exclusão'} />
                </div>

                {stateAlert.open === true
                    ? <DialogAlert severity={stateAlert.ok === true ? 'success' : 'error'} message={stateAlert.message} />
                    : <></>
                }
            </div>
        </div>

    </div>
}


export default TableListBook