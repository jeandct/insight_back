import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import API from '../../services/API';
import OffersEditor from './OffersEditor';

import { UserContext } from '../../contexts/UserContext';
import './Offers.scss';

const Offers = () => {
  const { register, handleSubmit } = useForm();
  const { userDetails } = useContext(UserContext);
  const history = useHistory();
  const { addToast } = useToasts();

  const [editorContent, setEditorContent] = useState(
    "<p>Commencer à rédiger votre offre d'emploi</p>"
  );

  const handleOfferSubmit = async (data) => {
    try {
      await API.post(`/companies/${userDetails.id}/offers`, {
        ...data,
        text: editorContent,
      });
      addToast('Votre offre a été enregistrée !', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/companies/offers');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="offers-editor">
      <h2>Créer votre offre d'emploi</h2>
      <form noValidate>
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Titre"
            ref={register}
          />
        </label>
        <label htmlFor="location">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Localisation"
            ref={register}
          />
        </label>
        <div className="editor-container">
          <OffersEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          // className={classes.button}
          onClick={handleSubmit(handleOfferSubmit)}
          startIcon={<SaveIcon />}
        >
          Enregistrer
        </Button>
      </form>
    </div>
  );
};

export default Offers;
