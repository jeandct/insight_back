import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
  const { environment, setEnvironment } = useContext(UserContext);

  return (
    <div>
      <Link to="/login" onClick={() => setEnvironment('companies')}>
        Espace Employeur
      </Link>
      <p>{environment}</p>
      <Link to="/login" onClick={() => setEnvironment('candidates')}>
        Espace Candidat
      </Link>
    </div>
  );
};

export default Home;
