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
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { createUpdate, updateTruck } from "../lib/db";

export default function EditableForm({ user, foodTruckData }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  function handleHashTag(string) {
    // slice string into 3 parts
    const changeHash = string.replaceAll("#", " ");
    const hashTags = changeHash.split(" ");
    const arrayOfTags = [];

    for (let i = 0; i < hashTags.length; i++) {
      if (i != 0) {
        arrayOfTags.push(hashTags[i]);
      }
    }

    return arrayOfTags;
  }

  function onSubmit(data) {
    const newUpdate = {
      author: data.name,
      description: data.description,
      location: data.location,
      schedule: data.schedule,
      tag: handleHashTag(data.tag),
      createdAt: new Date().toISOString(),
    };

    console.log(newUpdate);

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     updateTruck(user.truckId, newUpdate);
    //     reset();
    //     resolve();
    //   }, 3000);
    // });
  }

  return (
    <Box as="form" m={4} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <InputGroup my={2}>
          <Editable defaultValue="yeee" size={"lg"}>
            <EditablePreview />

            <EditableTextarea
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
          </Editable>
        </InputGroup>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Where are you from?</FormLabel>
        <InputGroup my={2}>
          <Input
            id="location"
            placeholder="location..."
            {...register("location", {
              required: "This is required",
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.name && errors.location?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="tag">#FoodTag</FormLabel>
        <InputGroup my={2}>
          <Input
            id="ta"
            placeholder="location..."
            {...register("tag", {
              required: "This is required",
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.name && errors.location?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.body}>
        <FormLabel htmlFor="schedule">Weekly Schedule</FormLabel>
        <Textarea
          my={2}
          id="schedule"
          placeholder="Enter a note with 240 characters..."
          {...register("schedule", {
            maxLength: { value: 240, message: "240 Character limit" },
          })}
        />

        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.body}>
        <FormLabel htmlFor="description">Food Truck Description</FormLabel>
        <Textarea
          my={2}
          id="description"
          placeholder="Enter a note with 240 characters..."
          {...register("description", {
            maxLength: { value: 240, message: "240 Character limit" },
          })}
        />

        <FormErrorMessage>
          {errors.body && errors.body.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        mt={4}
        bg={"red.400"}
        color={"white"}
        isLoading={isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
}
