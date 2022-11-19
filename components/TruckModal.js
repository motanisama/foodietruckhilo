import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  Input,
  Box,
  Stack,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../lib/auth";
import ProfileBody from "./ProfileBody";
import ProfileDetails from "./ProfileDetails";
import { useSingleFoodTruck, useSingleSchedule } from "../lib/hooks";
import UpdateSection from "./UpdateSection";

function TruckModal({ children, id, scheduleId }) {
  const { foodTruckData } = useSingleFoodTruck(id);

  const { scheduleData } = useSingleSchedule("wUgRua9uhFhSlw1Vtxgb");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="red.400"
        fontWeight={"medium"}
        color="white"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
        variant="solid"
        size="md"
        maxW={"200px"}
      >
        {children}
      </Button>

      <Modal
        scrollBehavior="inside"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"6xl"}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px) " />
        <ModalContent>
          {/* <ModalHeader fontWeight={"bold"}>Login to Food truck</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              as="div"
              width={"full"}
              mb={4}
              w={"full"}
              flexDirection="column"
              maxW={"1600px"}
            >
              <Box
                w={"100%"}
                h={"50%"}
                backgroundImage={"/1.jpg"}
                backgroundPosition={"center"}
              ></Box>
              <Box
                flex={1}
                w={"full"}
                direction="column"
                backgroundColor={"white"}
                width={"full"}
                h={"100%"}
                overflow={"hidden"}
              >
                <ProfileBody
                  foodTruckData={foodTruckData}
                  scheduleData={scheduleData}
                />
              </Box>
            </Box>
            <Flex flexDir={"row"} w={"full"} maxW={"1600px"}>
              <Box flex={1} mr={4}>
                <ProfileDetails
                  foodTruckData={foodTruckData}
                  scheduleData={scheduleData}
                />
              </Box>

              <Box flex={2}>
                <UpdateSection title={`Today's update's`}></UpdateSection>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} type="submit">
              Sign in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TruckModal;
