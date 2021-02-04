import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import API from '../../services/API';
import { UserContext } from '../../contexts/UserContext';
import OffersTable from './OffersTable';

const OffersList = () => {
  const { userDetails } = useContext(UserContext);
  const [offersList, setOffersList] = useState([]);
  const [toggleList, setToggleList] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await API.get(`/companies/${userDetails.id}/offers`);
      setOffersList(res.data);
      console.log(offersList);
    } catch (err) {
      console.error(err);
    }
  }, [toggleList]);

  return (
    <div>
      <h2>Mes Offres</h2>
      <OffersTable
        offersList={offersList}
        toggleList={toggleList}
        setToggleList={setToggleList}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/companies/offers/create')}
      >
        Créer une offre
      </Button>
    </div>
  );
};

export default OffersList;
