import {
  Box,
  Button,
  Heading,
  Text,
  Link,
  Icon,
  useColorModeValue,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { getDownloadURL } from "firebase/storage";
import React, { useRef, useState } from "react";
import { MdUploadFile } from "react-icons/md";
import { updateTruck, uploadPhotos } from "../lib/db";
import { storage } from "../lib/firebase";

function ProfileUpload({ foodTruckData }) {
  const hidden = useRef();
  const inputRef = React.useRef(null);
  const toast = useToast();

  const handleClick = (e) => {
    e.target.preventDefault;
    hidden.current.click();
  };
  const [imgUrl, setImgUrl] = useState(null);
  const [file, setFile] = useState();
  const [progresspercent, setProgresspercent] = useState(0);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
    const upload = await uploadPhotos(file, foodTruckData[0].id);
    const url = await getDownloadURL(upload);
    await updateTruck(foodTruckData[0].id, {
      menuUrl: url,
    });
    console.log(url);
    setImgUrl(url);
    if (!file) return;
  };

  return (
    <Box p={4} width={"full"} height={"full"}>
      <Box
        w={"full"}
        height={"12rem"}
        border={"4px"}
        borderColor={"red.400"}
        borderRadius={"xl"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        borderStyle={"dashed"}
        onClick={handleClick}
        bg={"gray.50"}
      >
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Icon color={"red.400"} as={MdUploadFile} fontSize={"64px"} />
          <Heading color={"red.400"} textOverflow={"ellipsis"}>
            {file ? file.name : "Upload Menu"}
          </Heading>
        </Stack>
      </Box>

      <form>
        <input ref={hidden} hidden type="file" onChange={onFileChange} />
      </form>
    </Box>
  );
}

export default ProfileUpload;
