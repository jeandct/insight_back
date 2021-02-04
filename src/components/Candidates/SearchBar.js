import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';

const useStyles = makeStyles(() => ({
  inputFst: {
    width: '250px',
    marginRight: '20px',
  },
  inputSnd: {
    width: '200px',
    marginRight: '20px',
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const history = useHistory();

  const handleSearch = (data) => {
    if (!data.title && !data.location) {
      history.push(`/candidates/offers`);
    } else {
      const clientQueryParams = queryString.stringify(data);
      history.push(`/candidates/offers?${clientQueryParams}`);
    }
  };

  return (
    <div>
      <h4 style={{ marginTop: '50px' }}>Trouver votre prochain emploi !</h4>
      <form
        style={{
          display: 'flex',
          width: '70vw',
          margin: '30px auto',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextField
          className={classes.inputFst}
          margin="normal"
          variant="outlined"
          placeholder="Poste"
          name="title"
          inputRef={register}
        />
        <TextField
          className={classes.inputSnd}
          margin="normal"
          variant="outlined"
          placeholder="Lieu"
          name="location"
          inputRef={register}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ width: '150px', height: '40px' }}
        >
          Rechercher{' '}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
