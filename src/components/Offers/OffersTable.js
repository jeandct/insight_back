import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserContext } from '../../contexts/UserContext';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    width: '100%',
  },
  root: {
    width: '90%',
    margin: 'auto',
    marginBottom: '20px',
  },
  head: {
    backgroundColor: '#3F51B5',
  },
  headCell: {
    color: 'white',
  },
});

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const OffersTable = ({ offersList }) => {
  const classes = useStyles();
  const history = useHistory();

  const { environment } = useContext(UserContext);

  function createData(title, location, id) {
    return { title, location, id };
  }

  const rows = offersList.map((offer) => {
    return createData(offer.title, offer.location, offer.id);
  });

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.head}>
            <TableCell className={classes.headCell}>Titre</TableCell>
            <TableCell className={classes.headCell} align="center">
              Lieu
            </TableCell>
            {environment === 'companies' && (
              <TableCell className={classes.headCell} align="center" />
            )}

            {environment === 'companies' && (
              <TableCell className={classes.headCell} align="center" />
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => history.push(`/offers/${row.id}`)}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.location}</TableCell>
              {environment === 'companies' && (
                <TableCell align="right">Editer</TableCell>
              )}
              {environment === 'companies' && (
                <TableCell align="right">Supprimer</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OffersTable;
