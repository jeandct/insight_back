import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
  const { environment, setEnvironment } = useContext(UserContext);

  return (
    <div>
      <Link to="/company/login" onClick={() => setEnvironment('company')}>
        Espace Employeur
      </Link>
      <p>{environment}</p>
      <Link to="/candidate/login" onClick={() => setEnvironment('candidate')}>
        Espace Candidat
      </Link>
    </div>
  );
};

export default Home;
