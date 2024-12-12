'use client';

import { useState, ChangeEvent } from 'react';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Credentials } from "@aws-sdk/client-sts";

const UploadPage = () => {
  const [uploadFile, setUploadFile] = useState<null | File>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadFile(event.target.files?.[0] as File | null); // Optional chaining and type assertion
  };

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement, any>) => {
    if (!uploadFile) return;
    event.preventDefault();

    const client = new S3Client({
      credentials: new Credentials({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      }),
      region: process.env.REACT_APP_AWS_REGION,
    });

    try {
      const uploadToS3 = new PutObjectCommand({
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: uploadFile.name,
        Body: uploadFile,
      });
      let response = await client.send(uploadToS3);
      console.log(response.VersionId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid>
      <TextField type="file" onChange={handleChange} />
      <Button variant="contained" onClick={handleUpload}>
        Button
      </Button>
    </Grid>
  );
};

export default UploadPage;