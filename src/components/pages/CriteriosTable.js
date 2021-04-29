import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";

import {conectividad} from './Conectividad'

let data = {};

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(nombre, descripcion , btn) {
  return { nombre, descripcion , btn  };
}


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
}); 




export default function CriteriosTable({criterios}) {

  const history = useHistory();
  

  let rows = criterios.map((items, index)=>{
    return createData(items.nombre, items.descripcion,  
        <div>
            <a href={() => false} onClick={(e) => {eliminar(items.nombre , e)}} className="waves-effect waves-light btn"> Eliminar  </a>
            <a href={() => false} onClick={(e) => {actualizar(items.nombre , e)}} className="waves-effect waves-light btn"> Actualizar </a>
        </div>
        )
  });


  function actualizar(nombre, event){


      axios({
          method: 'post',
          url: conectividad.endPointBack+'api/criterios/buscaruno',
          data: {nombre: nombre}
        }).then(function (response) {
            console.log(response.data.doc);
            data = response.data.doc
            history.push({
              pathname: '/Proveedor/criterio',
              datos: { 
                 name : data.nombre ,
                 description : data.descripcion
               } 
            })
        })
        .catch(function (error) {
          console.log(error)
        });



    
  }

   
  function eliminar(nombre, event){

    axios({
      method: 'post',
      url: conectividad.endPointBack+'api/criterios/eliminar',
      data: { "nombre" : nombre}
    }).then(function (response) {
      console.log(response);
      Swal.fire({
        title: 'Criterio eliminado con exito',
        showDenyButton: false,
        confirmButtonText: `Ok`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        } 
      })
    })
    .catch(function (error) {
      Swal.fire(
        'Algo anda mal',
        error,
        'error'
      )
    });

  }
  

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.nombre}>
              <TableCell style={{ width: 20 }} component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell style={{ width: 50 }} align="right">
                {row.descripcion}
              </TableCell>
              <TableCell style={{ width: 20 }} align="right">
                {row.btn}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 7, 10, 15, { label: 'todas', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'Filas por pagina' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
