import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { listBooks } from '../service/restService';

export default function ComboBox() {
    const [state, setState] = React.useState({ books: [] })

    React.useEffect(() => {
        listBooks.then(books => addRows(books.livros))

        function addRows(books) {
            books.forEach((item, i) => {
                item['id'] = i + 1;
            });

            setState({ rows: books })

        }
    }, [])

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={state.rows}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
];
