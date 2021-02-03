import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '../../services/API';
import OffersEditor from './OffersEditor';
import './Offers.scss';
import { UserContext } from '../../contexts/UserContext';

const Offers = () => {
  const { register, handleSubmit } = useForm();
  const { userDetails } = useContext(UserContext);

  const [editorContent, setEditorContent] = useState(
    "<p>Commencer à rédiger votre offre d'emploi</p>"
  );

  const handleOfferSubmit = async (data) => {
    try {
      const res = await API.post(`/companies/${userDetails.id}/offers`, {
        ...data,
        text: editorContent,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="offers-editor">
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
        <OffersEditor
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
        <input type="submit" value="Sauvegarder" />
      </form>
    </div>
  );
};

export default Offers;
