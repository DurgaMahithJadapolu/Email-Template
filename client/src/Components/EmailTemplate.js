import React, { useState } from 'react';
import axios from 'axios';
import './EmailTemplateStyles.css';

const App = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [isPreviewPopupVisible, setIsPreviewPopupVisible] = useState(false);
  const [isSuccessPopupVisible1, setIsSuccessPopupVisible1] = useState(false);
//   const [isRenderPopupVisible, setIsRenderPopupVisible] = useState(false);

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('https://email-template-zyw4.onrender.com/api/uploadImage', formData);
        setUploadedImageUrl(response.data.imageUrl);
        setIsSuccessPopupVisible1(true); // Show success popup
      } catch (error) {
        console.error(error);
        // Handle error, you can add an error popup if you want
      }
    }
  };
  const handleSaveConfig = async () => {
    const emailConfig = { title, content, imageUrl: uploadedImageUrl };

    try {
      await axios.post('https://email-template-zyw4.onrender.com/api/uploadEmailConfig', emailConfig);
      setIsSuccessPopupVisible(true); // Show success popup
    } catch (error) {
      console.error(error);
      alert('Error saving email configuration.');
    }
  };

  const handleFetchLayout = async () => {
    try {
      const response = await axios.get('https://email-template-zyw4.onrender.com/api/getEmailLayout');
      const layoutHtml = response.data.html;

      // Replace the placeholders in the layout with actual values
      const renderedHtml = layoutHtml
        .replace('{{title}}', title)
        .replace('{{content}}', content)
        .replace('{{imageUrl}}', uploadedImageUrl || '');

      setPreviewHtml(renderedHtml);
      setIsPreviewPopupVisible(true); // Show preview popup
    } catch (error) {
      console.error(error);
      alert('Error fetching email layout.');
    }
  };

  const handleRenderAndDownload = async () => {
    try {
      const response = await axios.post('https://email-template-zyw4.onrender.com/api/renderAndDownloadTemplate', { 
        title, 
        content, 
        imageUrl: uploadedImageUrl 
      });
      window.open(response.data.downloadUrl, '_blank');
    //   setIsRenderPopupVisible(true); // Show render and download popup
    } catch (error) {
      console.error(error);
      alert('Error rendering and downloading template.');
    }
  };

  return (
    <div className="container">

        <div className="App">
        <h1 style={{textAlign:"center"}}>Email Template Builder</h1>
      <div>
        <label><strong>Title:</strong></label>
        <input type="text"
         placeholder='Enter Title here... '
        value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label><strong>Content:</strong></label>
        <textarea value={content} 
        placeholder='Enter lager Content here... '
        onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label> <strong>Upload Image:</strong></label>
        <input type="file" onChange={handleFileUpload} />
      </div>
      {/* {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '200px' }} />} */}
      <div>
        <button onClick={handleSaveConfig}>Save Configuration</button>
        <button onClick={handleFetchLayout}>Preview Layout</button>
        <button onClick={handleRenderAndDownload}>Render and Download</button>
      </div>
  {/* {previewHtml && <div dangerouslySetInnerHTML={{ __html: previewHtml }} />} */}

        </div>
     
    


 {/* Success Popup */}
 {isSuccessPopupVisible1 && (
        <div className="popup">
          <div className="popup-content">
            <h2>Image  Successfully Uploaded!</h2>
            {/* <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} /> */}
            <button onClick={() => setIsSuccessPopupVisible1(false)}>Close</button>
          </div>
        </div>
      )}



      {/* Success Popup */}
      {isSuccessPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Success!</h2>
            <p>Your email Template has been saved in Database.</p>
            <button onClick={() => setIsSuccessPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Preview Layout Popup */}
      {isPreviewPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <div  className="content-data"    dangerouslySetInnerHTML={{ __html: previewHtml }} />
            <button onClick={() => setIsPreviewPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Render and Download Popup
      {isRenderPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Download HTML</h2>
            <p>Your HTML file is ready for download.</p>
            <button onClick={() => setIsRenderPopupVisible(false)}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default App;
