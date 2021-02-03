import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../contexts/UserContext';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import API from '../../services/API';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const {
    environment,
    loggedIn,
    setEnvironment,
    setLoggedIn,
    setUserDetails,
  } = useContext(UserContext);

  const handleCandidateLogout = () => {
    API.get(`/auth/${environment}/logout`).then(() => {
      setEnvironment(null);
      setLoggedIn(false);
      setUserDetails({});
      history.push('/');
    });
  };

  const showLogin = () => {
    if (loggedIn) {
      return (
        <Button color="inherit" onClick={handleCandidateLogout}>
          Déconnexion
        </Button>
      );
    }

    return <></>;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            InsightJobs
          </Typography>
          {showLogin(environment)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
