import React, { useContext, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

// import document from '../../CV.pdf';

import { UserContext } from '../../contexts/UserContext';
import API from '../../services/API';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CV = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [filePath, setFilePath] = useState();

  // eslint-disable-next-line no-unused-vars
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line no-shadow
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const upload = (file) => {
    const formData = new FormData();
    formData.append('upload_cv', file);

    API.post(`/candidates/${userDetails.id}/upload`, formData).then((res) => {
      setFilePath(res.data);
      setUserDetails((user) => {
        return { ...user, cv: res.data };
      });
      console.log(filePath);
    });
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFilePath(e.target.files[0])} />
      <input type="submit" value="Envoyer" onClick={() => upload(filePath)} />
      <div style={{ height: '500px', width: '500px' }}>
        <Document
          file={`${process.env.REACT_APP_API_BASE_URL}/static/${userDetails.cv}`}
          //   file={document}
          onLoadSuccess={onDocumentLoadSuccess}
          onError={console.error}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default CV;
