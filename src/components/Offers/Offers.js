import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import API from '../../services/API';
import OffersEditor from './OffersEditor';
import { UserContext } from '../../contexts/UserContext';
import './Offers.scss';

const Offers = () => {
  const { register, handleSubmit } = useForm();
  const { userDetails } = useContext(UserContext);
  const history = useHistory();

  const [editorContent, setEditorContent] = useState(
    "<p>Commencer à rédiger votre offre d'emploi</p>"
  );

  const handleOfferSubmit = async (data) => {
    try {
      await API.post(`/companies/${userDetails.id}/offers`, {
        ...data,
        text: editorContent,
      });
      history.push('/company/offers');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="offers-editor">
      <h2>Créer une offre d'emploi</h2>
      <form noValidate onSubmit={handleSubmit(handleOfferSubmit)}>
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
        <input type="submit" value="Sauvegarder" />
      </form>
    </div>
  );
};

export default Offers;
