import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DateRent from './DateRent';

export default function DialogBooks(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    {props.date === true ?
                        <DialogContentText id="alert-dialog-description">
                            <DateRent label={'Data Início Aluguel'} value={props.valueInitialDate} setValue={props.changeInitialDate} />
                            <DateRent label={'Data Fim Aluguel'} value={props.valueFinalDate} setValue={props.changeFinalDate} />
                        </DialogContentText>
                        : <DialogContentText id="alert-dialog-description">
                            {props.message}
                        </DialogContentText>

                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onConfirm} variant="contained" color="success">Confirmar</Button>
                    <Button onClick={props.handleClose} autoFocus variant="outlined" color="error">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
