import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

// import document from '../../CV.pdf';

import { UserContext } from '../../contexts/UserContext';
import API from '../../services/API';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CVView = (props) => {
  const { userDetails } = useContext(UserContext);
  const { match } = props;
  const [openModal, setOpenModal] = useState(false);
  const [filePath, setFilePath] = useState();
  const [meetingDate, setMeetingDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);
  const { addToast } = useToasts();
  const history = useHistory();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleMeeting = () => {
    API.put(`/companies/${userDetails.id}/offers/${match.params.offer_id}`, {
      meeting_date: meetingDate,
      candidate_id: match.params.candidate_id,
    })
      .then(() => {
        addToast('Proposition de rendez-vous envoyée !', {
          appearance: 'success',
          autoDismiss: true,
        });
        history.push('/companies/applies');
      })
      .catch(() => {
        addToast('Echec !', {
          appearance: 'warning',
          autoDismiss: true,
        });
      });
  };

  const rejectCandidate = () => {
    API.put(`/companies/${userDetails.id}/offers/${match.params.offer_id}`, {
      rejected: true,
      candidate_id: match.params.candidate_id,
    })
      .then(() => {
        addToast('Candidat refusé !', {
          appearance: 'success',
          autoDismiss: true,
        });
        history.push('/companies/applies');
      })
      .catch(() => {
        addToast('Echec !', {
          appearance: 'warning',
          autoDismiss: true,
        });
      });
  };

  // eslint-disable-next-line no-shadow
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    API.get(
      `/companies/${userDetails.id}/candidates/${match.params.candidate_id}`
    ).then((res) => setFilePath(res.data.cv));
  });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleModal}>
        Proposer un rendez-vous
      </Button>
      <Button variant="outlined" color="secondary" onClick={rejectCandidate}>
        Refuser le candidat
      </Button>
      <div style={{ height: '500px', width: '500px' }}>
        <Document
          file={`${process.env.REACT_APP_API_BASE_URL}/static/${filePath}`}
          //   file={document}
          onLoadSuccess={onDocumentLoadSuccess}
          onError={console.error}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>

      <Dialog
        open={openModal}
        onClose={handleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Proposer un créneau horaire :
            <form className="vocal-campaign-date" noValidate>
              <TextField
                id="datetime-local"
                type="datetime-local"
                value={meetingDate}
                className="textField"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setMeetingDate(e.target.value);
                }}
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal} color="primary">
            Non
          </Button>
          <Button
            onClick={() => {
              handleMeeting();
              handleModal();
            }}
            color="primary"
            autoFocus
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CVView;
