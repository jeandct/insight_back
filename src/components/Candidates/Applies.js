import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AppliesTable from '../Offers/AppliesTable';
import API from '../../services/API';

const Applies = () => {
  const { userDetails, environment } = useContext(UserContext);
  const [appliesList, setAppliesList] = useState([]);
  const [toggleMeeting, setToggleMeeting] = useState(false);

  useEffect(() => {
    API.get(`/${environment}/${userDetails.id}/applies`).then((res) =>
      setAppliesList(res.data)
    );
  }, [toggleMeeting]);

  return (
    <div>
      <h2>Candidatures</h2>
      <AppliesTable
        appliesList={appliesList}
        setToggleMeeting={setToggleMeeting}
        toggleMeeting={toggleMeeting}
      />
    </div>
  );
};

export default Applies;
