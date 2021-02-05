import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import OffersList from '../Offers/OffersList';
import SearchBar from './SearchBar';

const Feed = () => {
  const { userDetails, environment } = useContext(UserContext);

  return (
    <div>
      <h1>Bonjour {userDetails.firstname}</h1>
      {environment === 'candidates' && <SearchBar />}
      {environment === 'companies' && <OffersList />}
    </div>
  );
};

export default Feed;
