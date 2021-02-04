import React, { useContext } from 'react';
import OffersSearch from './OffersSearch';
import { UserContext } from '../../contexts/UserContext';

const Feed = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <div>
      <h1>Bonjour {userDetails.firstname}</h1>
      <OffersSearch />
    </div>
  );
};

export default Feed;
