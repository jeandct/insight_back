import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import API from '../../services/API';
// import { UserContext } from '../../contexts/UserContext';
import OffersTable from '../Offers/OffersTable';

const OffersSearch = () => {
  // const { userDetails } = useContext(UserContext);
  const [offersList, setOffersList] = useState([]);

  // const history = useHistory();

  const searchParams = {
    ...queryString.parse(window.location.search),
  };

  // const { title, location } = searchParams;

  useEffect(async () => {
    console.log(searchParams);

    try {
      if (searchParams[0]) {
        const clientQueryParams = queryString.stringify(searchParams);
        const res = await API.get(`/candidates/offers?${clientQueryParams}`);
        setOffersList(res.data);
      } else {
        const res = await API.get(`/candidates/offers`);
        setOffersList(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return <OffersTable offersList={offersList} />;
};

export default OffersSearch;
