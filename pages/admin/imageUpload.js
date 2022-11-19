import { Box, Heading } from "@chakra-ui/react";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { uploadPhotoFireStore, uploadPhotos } from "../../lib/db";
import { useStorage } from "../../lib/hooks";

function imageUpload() {
  const [fileUrl, setFileUrls] = useState("");
  const [imageList, setImageList] = useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    setFileUrl(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!fileUrl) {
      alert("Please upload an image first!");
      return;
    }

    if (fileUrl) {
      // await uploadPhotoFireStore("amZeDAL9qDrDHyep3tcQ", url);
    }
  };

  return (
    <Box>
      <Heading>ImageUpload</Heading>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <button>Submit</button>
      </form>
    </Box>
  );
}

export default imageUpload;
