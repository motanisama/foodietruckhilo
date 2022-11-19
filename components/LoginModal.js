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
} from "@chakra-ui/react";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../lib/auth";

function LoginModal({ children }) {
  const auth = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const toast = useToast();

  const onLogin = async ({ email, password }) => {
    console.log("login");
    console.log(email);
    console.log(password);

    try {
      const response = await auth.signInWithEmail(email, password);
      console.log(response);
      toast({
        title: "Success!",
        description: "Welcome back",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (e) {
      console.log(e.message);
      toast({
        title: "Error",
        description: "Trobule signing in",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // locally mutating data without validating
  };

  const handleContact = () => {
    onClose();
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
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

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(onLogin)}>
          <ModalHeader fontWeight={"bold"}>Login to Food truck</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="foodtruck@gmail.com"
                name="email"
                {...register("email", {
                  required: "Required",
                })}
                css={{
                  "&::placeholder": {
                    color: "#A0AEC0",
                    opacity: 1,
                  },
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password..."
                name="password"
                {...register("password", {
                  required: "Required",
                })}
                css={{
                  "&::placeholder": {
                    color: "#A0AEC0",
                    opacity: 1,
                  },
                }}
              />
            </FormControl>
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

export default LoginModal;
