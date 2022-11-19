import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  Box,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  FormHelperText,
  Flex,
  RadioGroup,
  Stack,
  Radio,
  useRadioGroup,
  HStack,
  useRadio,
  useToast,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { createUpdate, updateTruck } from "../lib/db";
import { Toggle } from "./Toggle";

export default function UpdateForm({ user }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm();
  const toast = useToast();

  function onSubmit(data) {
    if (data.toggle === "") {
      return;
    }
    console.log(data);
    const newUpdate = {
      foodTruck: user.truckId,
      body: data.description,
      createdAt: new Date().toISOString(),
    };
    console.log(newUpdate);

    return new Promise((resolve) => {
      setTimeout(() => {
        createUpdate(newUpdate);
        reset();
        resolve();
        toast({
          title: "Success!",
          description: "Updated posted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }, 2000);
    });
  }

  return (
    <Box as="form" m={4} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.body}>
        <FormLabel fontSize={"xl"}>Update</FormLabel>

        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.body}>
        <Textarea
          border={"0px"}
          bg={"gray.100"}
          h={"20vh"}
          fontSize={"xl"}
          my={2}
          id="description"
          placeholder="Enter a note with 240 characters... "
          {...register("description", {
            maxLength: { value: 240, message: "240 Character limit" },
          })}
        />

        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        bg={"red.400"}
        mt={4}
        isLoading={isSubmitting}
        type="submit"
        color="white"
        fontSize={"xl"}
      >
        Submit
      </Button>
    </Box>
  );
}
