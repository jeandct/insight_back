import React, { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import 'moment/locale/fr';
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
import API from '../../services/API';

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

const AppliesTable = ({ appliesList, setToggleMeeting, toggleMeeting }) => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToasts();
  moment.locale('fr');

  const { environment, userDetails } = useContext(UserContext);

  function createData(
    title,
    location,
    id,
    status,
    meeting,
    firstname,
    lastname,
    cv,
    candidateId,
    candidateRejected,
    meetingAccepted
  ) {
    return {
      title,
      location,
      id,
      status,
      meeting,
      firstname,
      lastname,
      cv,
      candidateId,
      candidateRejected,
      meetingAccepted,
    };
  }

  const rows = appliesList.map((offer) => {
    return createData(
      offer.title,
      offer.location,
      offer.id,
      offer.completed,
      offer.meeting_date,
      offer.firstname,
      offer.lastname,
      offer.cv,
      offer.candidate_id,
      offer.rejected,
      offer.meeting_accepted
    );
  });

  const handleRedirect = (id, candidateId) => {
    if (environment === 'companies') {
      history.push(`/companies/offers/${id}/candidate/${candidateId}`);
    }
  };

  const acceptMeeting = (id) => {
    API.put(`/candidates/${userDetails.id}/offers/${id}`, {
      meeting_accepted: true,
    }).then(() => {
      addToast('Proposition de rendez-vous envoyée !', {
        appearance: 'success',
        autoDismiss: true,
      });
      setToggleMeeting(!toggleMeeting);
      history.push('/candidates/applies');
    });
  };

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
              <TableCell className={classes.headCell} align="center">
                Candidats
              </TableCell>
            )}

            <TableCell className={classes.headCell} align="center">
              Statut
            </TableCell>

            <TableCell className={classes.headCell} align="center">
              RDV
            </TableCell>
            <TableCell className={classes.headCell} align="center">
              RDV accepté
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleRedirect(row.id, row.candidateId)}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.location}</TableCell>
              {environment === 'companies' && (
                <TableCell align="center">
                  {row.firstname} {row.lastname}
                </TableCell>
              )}
              <TableCell align="center">
                {row.candidateRejected === 1 && 'Refusé'}
              </TableCell>

              <TableCell align="center">
                {row.meeting && moment(row.meeting).format('DD/MM/YYYY HH:mm')}
              </TableCell>
              <TableCell align="center">
                {row.meetingAccepted === 1 && 'Validé'}
                {row.meetingAccepted === 0 && environment === 'candidates' && (
                  <span
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => {}}
                    onClick={() => acceptMeeting(row.id)}
                  >
                    Accepter
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppliesTable;
