import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const OffersEditor = (props) => {
  const { editorContent, setEditorContent } = props;

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <Editor
      apiKey={process.env.REACT_APP_TINY_API_KEY}
      initialValue={editorContent}
      init={{
        height: '70vh',
        // content_css: 'document',
        statusbar: false,
        menubar: false,

        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'code',
        ],
        toolbar:
          // eslint-disable-next-line no-multi-str
          'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | code',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default OffersEditor;
