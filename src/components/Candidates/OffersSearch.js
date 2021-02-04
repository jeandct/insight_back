import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import API from '../../services/API';
// import { UserContext } from '../../contexts/UserContext';
import OffersTable from '../Offers/OffersTable';

const OffersSearch = () => {
  // const { userDetails } = useContext(UserContext);
  const [offersList, setOffersList] = useState([]);

  // const history = useHistory();

  useEffect(async () => {
    try {
      const res = await API.get(`/candidates/offers`);
      setOffersList(res.data);
      console.log(offersList);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return <OffersTable offersList={offersList} />;
};

export default OffersSearch;
