import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Feed = () => {
  const { userDetails } = useContext(UserContext);

  return <div>Hello {userDetails.firstname}</div>;
};

export default Feed;
