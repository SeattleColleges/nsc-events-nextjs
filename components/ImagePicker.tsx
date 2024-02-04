import React, { useState, ChangeEvent } from 'react';

const ImagePicker: React.FC = () => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  // handling file selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // update state
      setSelectedImage(file);

      // create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
      <div>
        <input type="file" accept='image/*' onChange={handleImageChange} />
          {preview && (
            <div>
              <h3>Image Preview:</h3>
              <img src={preview.toString()} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
            </div> 
          )}
      </div>
  );
};

export default ImagePicker; 