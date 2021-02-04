import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { environment, loggedIn } = useContext(UserContext);

  const showNavBar = (env) => {
    if (env === 'candidates' && loggedIn) {
      return (
        <div className="navbar">
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/candidates/cv">Mes CV</Link>
            </li>
            <li>
              <Link to="/candidates/applies">Mes candidatures</Link>
            </li>
          </ul>
        </div>
      );
    }
    if (env === 'companies' && loggedIn) {
      return (
        <div className="navbar">
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/companies/offers">Offres</Link>
            </li>
            <li>
              <Link to="/companies/applies">Candidats</Link>
            </li>
          </ul>
        </div>
      );
    }
    return <></>;
  };

  return <>{showNavBar(environment)}</>;
};

export default NavBar;
