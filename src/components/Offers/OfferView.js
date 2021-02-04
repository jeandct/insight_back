import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { useToasts } from 'react-toast-notifications';
import { Button } from '@material-ui/core';
import { UserContext } from '../../contexts/UserContext';
import API from '../../services/API';

const OfferView = (props) => {
  const { match } = props;
  const { userDetails, environment } = useContext(UserContext);

  const [offerDetail, setOfferDetail] = useState({});

  const history = useHistory();
  const { addToast } = useToasts();

  const apply = () => {
    API.post(`/candidates/${userDetails.id}/offers/${match.params.offer_id}`)
      .then(() => {
        addToast('Candidature enregistrée !', {
          appearance: 'success',
          autoDismiss: true,
        });
        history.push('/');
      })
      .catch(() => {
        addToast('Vous avez déjà postulé à cette offre !', {
          appearance: 'warning',
          autoDismiss: true,
        });
      });
  };

  useEffect(() => {
    API.get(`/companies/offers/${match.params.offer_id}`).then((res) =>
      setOfferDetail(res.data)
    );
  }, []);

  return (
    <div>
      <h2>{offerDetail.title}</h2>
      <h3>{offerDetail.location}</h3>
      {ReactHtmlParser(offerDetail.text)}
      {environment === 'candidates' && (
        <Button variant="contained" color="primary" onClick={apply}>
          Postuler Maintenant
        </Button>
      )}
    </div>
  );
};

export default OfferView;
