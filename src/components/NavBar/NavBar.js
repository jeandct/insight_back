import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { environment, loggedIn } = useContext(UserContext);

  const showNavBar = (env) => {
    if (env === 'candidate' && loggedIn) {
      return (
        <div className="navbar">
          <ul>
            <li>
              <Link to="/candidate/cv">Mes CV</Link>
            </li>
            <li>
              <Link to="candidate/apply">Mes candidatures</Link>
            </li>
            <li>
              <Link to="/candidate/meetings">Mes RDV</Link>
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
