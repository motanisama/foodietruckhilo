import {
  Avatar,
  Badge,
  Box,
  Heading,
  Flex,
  Button,
  Text,
  useToast,
  IconButton,
  AvatarBadge,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  MdRestaurantMenu,
  MdSettings,
  MdUpdate,
  MdOutlineFileUpload,
  MdUploadFile,
} from "react-icons/md";
import { updateLocation, updateTruck, uploadPhotos } from "../lib/db";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { serverTimestamp } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";

function AdminControl({ user, foodTruckData }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const hiddenProfileUpload = useRef();

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [profileUploadLoading, setProfileUploadLoading] = useState(false);

  useEffect(() => {
    foodTruckData && setImgUrl(foodTruckData[0].profileURL);
    // setImgUrl(foodTruckData[0].photoURL);
  }, [foodTruckData]);

  const onFileChange = async (e) => {
    setProfileUploadLoading(true);
    const file = e.target.files[0];
    const upload = await uploadPhotos(file, foodTruckData[0].id);

    const url = await getDownloadURL(upload);
    await updateTruck(foodTruckData[0].id, {
      profileURL: url,
    });

    setImgUrl(url);
    if (!file) return;
    setProfileUploadLoading(false);

    toast({
      title: "Success!",
      description: "Profile Picture updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);

    const update = await updateLocation(user.truckId);
    setLoading(false);

    document.getElementById("map").scrollIntoView({ behavior: "smooth" });

    toast({
      title: "Success!",
      description: "Updated Food Truck Location",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleProfilePicture = async () => {
    hiddenProfileUpload.current.click();
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      zIndex={1}
      alignItems={"center"}
      justifyContent={"center"}
      rounded={"lg"}
      paddingTop={4}
    >
      <Avatar
        showBorder={true}
        size={"2xl"}
        src={imgUrl}
        alt={"Avatar Alt"}
        mb={4}
        pos={"relative"}
        border={"2px solid white"}
      >
        <AvatarBadge
          boxSize="1em"
          onClick={() => {
            console.log("clicked!");
          }}
          borderColor="transparent"
          bg="white"
        >
          <IconButton
            color={"white"}
            bg={"red.400"}
            fontSize="32px"
            borderRadius={"50%"}
            icon={<MdUploadFile />}
            onClick={handleProfilePicture}
            isLoading={profileUploadLoading}
          />
        </AvatarBadge>
      </Avatar>

      <form>
        <input
          ref={hiddenProfileUpload}
          hidden
          type="file"
          onChange={onFileChange}
        />
      </form>
      <Heading size={"md"} my={1}>
        Last location update:
      </Heading>
      <Heading size={"md"} color={"gray.400"} my={1}>
        {foodTruckData
          ? format(parseISO(foodTruckData[0].lastLocationUpdate), "Pp")
          : null}
      </Heading>
      <Button
        rounded={"full"}
        bg={"red.400"}
        color={"white"}
        fontSize={"xl"}
        _focus={{
          bg: "red.500",
        }}
        leftIcon={<MdUpdate />}
        m={2}
        onClick={handleUpdate}
        isLoading={loading}
      >
        Update Location
      </Button>
    </Box>
  );
}

export default AdminControl;
