import React, { useState, useEffect } from 'react';
import { login } from '../service/restService';
import { makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    form: {
        height: '30%',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignSelf: "center",
        padding: '20px'
    },
    fieldLogin: {

    },
    fieldPassword: {

    },
    buttonLogin: {
        backgroundColor: "#7FEBEB"
    },
    helpTextFailure: {
        color: "#E22626"
    },
    helpTextSuccess: {
        color: "#26E226"
    },
    loading: {
        color: "blue"
    }
});

const initialState = {
    valueLogin: '',
    valuePassword: '',
    helpValue: '',
    messageLogin: '',
    loading: false
}

export default function Login(props) {

    const classes = useStyles();

    const [state, setState] = useState(initialState);

    function onChangeLogin(e) {
        setState({ ...state, valueLogin: e.target.value })

    }

    const onChangePassword = (e) => {
        setState({ ...state, valuePassword: e.target.value })
    }

    const onClickLogin = async () => {
        try {
            let res = await login(state.valueLogin, state.valuePassword)
            props.change(res.token, res.mensagem, res.ok)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div
            className={classes.root}>

            <form className={classes.form}>
                <TextField
                    className={classes.fieldLogin}
                    required
                    id="outlined-required"
                    size='medium'
                    placeholder='Login'
                    value={state.valueLogin}
                    onChange={e => { onChangeLogin(e) }}

                />
                <TextField
                    className={classes.fieldPassword}
                    required
                    id="outlined-disabled"
                    size='medium'
                    placeholder='Senha'
                    value={state.valuePassword}
                    onChange={e => { onChangePassword(e) }}
                />

                <Button className={classes.buttonLogin} onClick={onClickLogin}>
                    Login
                </Button>





            </form>



        </div>
    )

}


/**/
