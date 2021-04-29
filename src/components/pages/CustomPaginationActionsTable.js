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

function createData(name, Email, cuidad, pais, btn) {
  return { name, Email, cuidad, pais, btn };
}


const useStyles2 = makeStyles({
  table: {
    minWidth: 500, 
  },
});

export default function CustomPaginationActionsTable({proveedores}) {

  const history = useHistory();

  const rows = proveedores.map((items, index)=>{
    return createData(items.nombre, items.Email, items.ciudad, items.pais,
        <div>
            <a href={() => false} onClick={(e) => {eliminar(items.Email , e)}}   className="waves-effect waves-light btn"> Eliminar </a>
            <a href={() => false} onClick={(e) => {actualizar(items.Email , e)}} className="waves-effect waves-light btn"> Actualizar </a>
        </div>
        )
  });


  function actualizar(email, event){

    axios({
      method: 'post',
      url: conectividad.endPointBack+'api/proveedores/buscaruno',
      data: {"Email": email}
    }).then(function (response) {
        console.log(response.data.doc);
        data = response.data.doc;
        history.push({
          pathname: '/Proveedor/crear',
          datos: { 
             name : data.nombre ,
             identificationNumber : data.DNI,
             reason : data.razon,
             street : data.direccion,
             postalcode: data.codigopostal,
             city : data.ciudad,
             departament : data.departamento,
             country: data.pais,
             phone: data.telefono ,
             correo: data.Email,
             description: data.Descripcion
           } 
        })
    })
    .catch(function (error) {
      console.log(error)
    });

}


  function eliminar(email, event){

    axios({
      method: 'post',
      url: conectividad.endPointBack+'api/proveedores/eliminar',
      data: { "Email" : email}
    }).then(function (response) {
      console.log(response);
      Swal.fire({
        title: 'Proveedor eliminado con exito',
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
            <TableRow key={row.Email}>
              <TableCell style={{ width: 10 }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                {row.Email}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                {row.ciudad}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                {row.pais}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
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
