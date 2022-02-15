import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function DialogAlert(props) {
    return (
        <Stack sx={{ width: '100%', paddingLeft: '40px', paddingTop: '10px' }} spacing={2}>
            <Alert variant="filled" severity={props.severity} >{props.message}</Alert>
        </Stack>
    );
}