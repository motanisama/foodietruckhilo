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
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { createUpdate, updateTruck } from "../lib/db";

export default function UpdateForm({ user }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  function onSubmit(data) {
    const newUpdate = {
      foodTruck: user.truckId,
      body: data.description,
      type: "userUpdate",
      createdAt: new Date().toISOString(),
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        createUpdate(newUpdate);
        reset();
        resolve();
      }, 3000);
    });
  }

  return (
    <Box as="form" m={4} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.body}>
        <FormLabel htmlFor="description">Updates</FormLabel>
        <Textarea
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

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </Box>
  );
}
