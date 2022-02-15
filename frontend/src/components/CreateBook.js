import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createBook } from '../service/restService';
import { makeStyles } from '@material-ui/core';
import DialogAlert from './DialogAlert';

const useStyles = makeStyles({
    form: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: "10px",
        justifyContent: 'center',
        padding: '20px'
    },
    textField: {
        width: '75%',
        alignSelf: "center"
    },
    button: {
        width: "25%",
        alignSelf: "center"
    }
});


export default function CreateBook(props) {
    const classes = useStyles()

    let initialState = {
        autor: '', titulo: '', subtitulo: '', genero: '', numeroPaginas: ''
    }

    const [stateAlert, setStateAlert] = React.useState({ ok: false, message: '', open: false })

    const [state, setState] = React.useState(initialState)

    function onChangeAutor(e) {
        setState({ ...state, autor: e.target.value })
    }

    function onChangeTitulo(e) {
        setState({ ...state, titulo: e.target.value })
    }

    function onChangeSubtitulo(e) {
        setState({ ...state, subtitulo: e.target.value })
    }

    function onChangeGenero(e) {
        setState({ ...state, genero: e.target.value })
    }

    function onChangeNumPagina(e) {
        setState({ ...state, numeroPaginas: e.target.value })
    }

    async function onClickCreateBook() {
        let res = await createBook(state, props.token)
        setStateAlert({ ok: res.ok, message: res.mensagem, open: true })
        closeAlert()
    }

    function closeAlert() {
        setTimeout(function () {
            setStateAlert({ ok: '', message: '', open: false })
        }, 5000)
    }


    return (
        <Box
            component="form"
            className={classes.form}
        >

            <TextField
                className={classes.textField}
                label="Autor"
                value={state.autor}
                onChange={onChangeAutor}
            />
            <TextField
                className={classes.textField}
                label="Título"
                value={state.titulo}
                onChange={onChangeTitulo}

            />

            <TextField
                className={classes.textField}
                label="SubTítulo"
                value={state.subtitulo}
                onChange={onChangeSubtitulo}
            />

            <TextField
                className={classes.textField}
                label="Gênero"
                value={state.genero}
                onChange={onChangeGenero}

            />

            <TextField
                className={classes.textField}
                label="Número de Páginas"
                value={state.numeroPaginas}
                onChange={onChangeNumPagina}
            />

            <Button variant="contained" className={classes.button} onClick={onClickCreateBook}>Cadastrar Livro</Button>

            {stateAlert.open === true
                ? <DialogAlert severity={stateAlert.ok === true ? 'success' : 'error'} message={stateAlert.message} />
                : <></>
            }
        </Box>
    );
}
