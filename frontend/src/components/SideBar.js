import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';


function SideBar(props) {
    const drawer = (
        <div style={{ paddingTop: '1%' }}>
            <List>
                {props.itensSideBar.map((book) => (
                    <ListItem button key={book.text} onClick={book.onClick}>
                        {book.iconComponent}
                        <ListItemText primary={book.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );



    return (
        <Box sx={{ display: 'flex' }}>
            {drawer}
            {props.displayedComponent}
        </Box>
    );
}

SideBar.propTypes = {
    itensSideBar: PropTypes.array,
    displayedComponent: PropTypes.element
};

export default SideBar;
