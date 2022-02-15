import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { listRents, listBooks, updateBook, rentBook, findBookById } from '../service/restService'
import { makeStyles } from '@material-ui/core';

let columns = [{ field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center', flex: 1 },
{ field: 'autor', headerName: 'Autor', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'titulo', headerName: 'Título', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'subtitulo', headerName: 'Subtítulo', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'dataInicioAluguel', headerName: 'Data Início Aluguel', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true },
{ field: 'dataFimAluguel', headerName: 'Data Fim Aluguel', width: 130, headerAlign: 'center', align: 'center', flex: 1, editable: true }]


const useStyles = makeStyles({
    button: {

        alignSelf: "center"
    }
});



const TableListRents = (props) => {

    const [state, setState] = useState({ rows: [] })

    useEffect(() => {

        listRents(props.token).then(list => addRows(list.rents))

    }, [])

    async function addRows(books) {
        let newRows = new Array();

        for (let i = 0; i < books.length; i++) {
            let book = books[i]
            book['id'] = i + 1;
            let livro = await findBookById(book.livros[0]._id, props.token)
            book['autor'] = livro.book.autor
            book['titulo'] = livro.book.titulo
            book['subtitulo'] = livro.book.subtitulo
            delete books[i].livros;
            newRows.push(book)
        }
        setState({ rows: newRows })
    }


    return <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'stretch' }}>
            <div style={{ flexGrow: 1, height: '100%' }}>
                <DataGrid
                    rows={state.rows}
                    columns={columns}
                    sx={{ m: 5, }}
                    checkboxSelection={false}

                />

            </div>
        </div>

    </div>
}


export default TableListRents