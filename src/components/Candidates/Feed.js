import React, { useContext } from 'react';
import OffersSearch from './OffersSearch';
import { UserContext } from '../../contexts/UserContext';
import OffersList from '../Offers/OffersList';

const Feed = () => {
  const { userDetails, environment } = useContext(UserContext);

  return (
    <div>
      <h1>Bonjour {userDetails.firstname}</h1>
      {environment === 'candidates' && <OffersSearch />}
      {environment === 'companies' && <OffersList />}
    </div>
  );
};

export default Feed;
