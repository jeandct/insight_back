import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Home.scss';

const Home = () => {
  const { setEnvironment } = useContext(UserContext);

  return (
    <div className="home-container">
      <div className="home-element">
        <Link to="/login" onClick={() => setEnvironment('companies')}>
          Espace Employeur
        </Link>
      </div>
      <div className="home-element">
        <Link to="/login" onClick={() => setEnvironment('candidates')}>
          Espace Candidat
        </Link>
      </div>
    </div>
  );
};

export default Home;
