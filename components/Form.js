import React, { useEffect } from "react";
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
  Icon,
  IconButton,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Heading,
  color,
  Toast,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { createUpdate, updateSchedule, updateTruck } from "../lib/db";
import { MdSettings } from "react-icons/md";
import { errorPrefix } from "@firebase/util";

export default function HookForm({ user, foodTruckData, schedule }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    // defaultValues: {
    //   name: "matt",
    //   description: foodTruckData && foodTruckData[0].description,
    //   schedule: foodTruckData && foodTruckData[0].schedule,
    //   tag: "#yo #yo #yo",
    //   address: foodTruckData && foodTruckData[0].address,
    // },
  });

  const {
    register: register2,
    formState: { errors: errors2, isSubmitting: isSubmitting2 },
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm();

  const toast = useToast();

  useEffect(() => {
    let defaults = {
      name: foodTruckData && foodTruckData[0].truckName,
      description: foodTruckData && foodTruckData[0].description,
      schedule: foodTruckData && foodTruckData[0].schedule,
      tag: foodTruckData && parseHashTag(foodTruckData[0].tag),
      address: foodTruckData && foodTruckData[0].address,
      author: foodTruckData && foodTruckData[0].author,
    };
    reset(defaults);
  }, [foodTruckData, reset]);

  useEffect(() => {
    let defaults = {
      MondayOpenTime: schedule && schedule.Monday.open,
      MondayClosedTime: schedule && schedule.Monday.closed,
      TuesdayOpenTime: schedule && schedule.Tuesday.open,
      TuesdayClosedTime: schedule && schedule.Tuesday.closed,
      WednesdayOpenTime: schedule && schedule.Wednesday.open,
      WednesdayClosedTime: schedule && schedule.Wednesday.closed,
      ThursdayOpenTime: schedule && schedule.Thursday.open,
      ThursdayClosedTime: schedule && schedule.Thursday.closed,
      FridayOpenTime: schedule && schedule.Friday.open,
      FridayClosedTime: schedule && schedule.Friday.closed,
      SaturdayOpenTime: schedule && schedule.Saturday.open,
      SaturdayClosedTime: schedule && schedule.Saturday.closed,
      SundayOpenTime: schedule && schedule.Sunday.open,
      SundayClosedTime: schedule && schedule.Sunday.closed,
    };
    reset2(defaults);
  }, [schedule, reset2]);

  const [bioeditable, setBioEditable] = useState(true);
  const [editSchedule, setEditSchedule] = useState(true);

  function parseHashTag(foodtruckData) {
    var newString = "";

    foodTruckData[0].tag.map((tag, i) => {
      if (tag != "") return (newString += `#${tag}`);
    });

    return newString;
  }

  function handleHashTag(string) {
    // slice string into 3 parts
    const noSpaces = string.trim();
    const hashTags = noSpaces.split("#");
    const arrayOfTags = [];

    for (let i = 0; i < hashTags.length; i++) {
      arrayOfTags.push(hashTags[i]);
    }

    return arrayOfTags;
  }

  function onSubmit(data) {
    console.log(data);
    const newUpdate = {
      truckName: data.name,
      description: data.description,
      schedule: [],
      tag: handleHashTag(data.tag),
      createdAt: new Date().toISOString(),
      author: data.author,
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        updateTruck(user.truckId, newUpdate);
        console.log(newUpdate);
        resolve();
        console.log("cleared!");
        setBioEditable(true);
        toast({
          title: "Success!",
          description: "Settings have been saved",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }, 3000);
    });
  }

  const onScheduleSubmit = (data) => {
    const newScheduleUpdate = {
      Monday: {
        open: data.MondayOpenTime,
        closed: data.MondayClosedTime,
        sort: 1,
      },
      Tuesday: {
        open: data.TuesdayOpenTime,
        closed: data.TuesdayClosedTime,
        sort: 2,
      },
      Wednesday: {
        open: data.WednesdayOpenTime,
        closed: data.WednesdayClosedTime,
        sort: 3,
      },
      Thursday: {
        open: data.ThursdayOpenTime,
        closed: data.ThursdayClosedTime,
        sort: 4,
      },
      Friday: {
        open: data.FridayOpenTime,
        closed: data.FridayClosedTime,
        sort: 5,
      },
      Saturday: {
        open: data.SaturdayOpenTime,
        closed: data.SaturdayClosedTime,
        sort: 6,
      },
      Sunday: {
        open: data.SundayOpenTime,
        closed: data.SundayClosedTime,
        sort: 7,
      },
    };
    console.log(newScheduleUpdate);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(user.scheduleId);
        updateSchedule(user.scheduleId, newScheduleUpdate);
        console.log(newScheduleUpdate);
        resolve();
        setEditSchedule(true);
        toast({
          title: "Success!",
          description: "Your schedule has been updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }, 3000);
    });
  };

  const handleScheduleSettings = () => {
    if (editSchedule) {
      setEditSchedule(false);
    } else {
      setEditSchedule(true);
    }
  };

  const handleSettings = () => {
    if (bioeditable) {
      setBioEditable(false);
    } else {
      setBioEditable(true);
    }
  };

  return (
    <Box m={4} minH={"50vh"}>
      <Tabs size={"lg"} colorScheme="gray">
        <TabList border={"0px"}>
          <Tab>Bio</Tab>
          <Tab>Schedule</Tab>
        </TabList>
        <TabPanels>
          <TabPanel as="form" onSubmit={handleSubmit(onSubmit)}>
            <Flex my={2} w={"full"} justifyContent={"space-between"}>
              <Heading>Bio</Heading>

              <IconButton
                backgroundColor={"red.400"}
                color={"white"}
                aria-label="Search database"
                icon={<MdSettings />}
                onClick={handleSettings}
              />
            </Flex>
            <FormControl isInvalid={errors.name}>
              <FormLabel fontSize={"xl"}>Name</FormLabel>
              <InputGroup my={2}>
                <InputLeftAddon
                  bg={"red.400"}
                  color={"white"}
                  border={"0px"}
                  children={<AtSignIcon />}
                />
                <Input
                  border={"0px"}
                  bg={"gray.100"}
                  fontSize={"xl"}
                  disabled={bioeditable}
                  id="name"
                  {...register("name")}
                  defaultValue={foodTruckData && foodTruckData[0].truckName}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.name}>
              <FormLabel fontSize={"xl"} htmlFor="tag">
                #FoodTag
              </FormLabel>
              <InputGroup my={2}>
                <Input
                  border={"0px"}
                  bg={"gray.100"}
                  fontSize={"xl"}
                  disabled={bioeditable}
                  id="tag"
                  defaultValue={
                    foodTruckData && parseHashTag(foodTruckData[0].tag)
                  }
                  {...register("tag")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.name && errors.location?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.body}>
              <FormLabel fontSize={"xl"} htmlFor="description">
                Food Truck Description
              </FormLabel>
              <Textarea
                border={"0px"}
                bg={"gray.100"}
                h={"20vh"}
                fontSize={"xl"}
                disabled={bioeditable}
                my={2}
                id="description"
                defaultValue={foodTruckData && foodTruckData[0].description}
                {...register("description", {
                  maxLength: { value: 240, message: "240 Character limit" },
                })}
              />

              <FormErrorMessage>
                {errors.body && errors.body.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.body}>
              <FormLabel>Contact</FormLabel>
              <Textarea
                border={"0px"}
                bg={"gray.100"}
                fontSize={"xl"}
                disabled={bioeditable}
                my={2}
                id="contact"
                defaultValue={foodTruckData && foodTruckData[0].author}
                {...register("author", {
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
              visibility={bioeditable ? "hidden" : "visible"}
            >
              Save Changes
            </Button>
          </TabPanel>
          <TabPanel>
            <Flex my={2} w={"full"} justifyContent={"space-between"}>
              <Heading>Schedule</Heading>
              <IconButton
                backgroundColor={"red.400"}
                color={"white"}
                aria-label="Search database"
                icon={<MdSettings />}
                onClick={handleScheduleSettings}
              />
            </Flex>
            <Box as="form" onSubmit={handleSubmit2(onScheduleSubmit)}>
              <WeeklyForm
                errors2={errors2}
                editable={editSchedule}
                register2={register2}
                schedule={schedule}
              />
              <Button
                mt={4}
                bg={"red.400"}
                color={"white"}
                isLoading={isSubmitting2}
                type="submit"
                visibility={editSchedule ? "hidden" : "visible"}
              >
                Save Changes
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function WeeklyForm({ errors2, editable, register2, schedule }) {
  const newschedule = schedule && Object.entries(schedule);
  const sortedSchedule =
    schedule &&
    newschedule.sort((a, b) => {
      return a[1].sort - b[1].sort;
    });

  const days = [
    { day: "Monday", open: "1", closed: "" },
    { day: "Tuesday", open: "2", closed: "" },
    { day: "Wednesday", open: "3", closed: "" },
    { day: "Thursday", open: "4", closed: "" },
    { day: "Friday", open: "5", closed: "" },
    { day: "Saturday", open: "6", closed: "" },
    { day: "Sunday", open: "7", closed: "" },
  ];

  return (
    <>
      {schedule &&
        sortedSchedule.map((day) => {
          if (day[0] === "updatedAt") {
            return;
          }

          return (
            <FormControl isInvalid={errors2.name} key={day[0]}>
              <FormLabel fontSize={"xl"} htmlFor="tag">
                {day[0]}
              </FormLabel>
              <InputGroup my={2}>
                <Input
                  type={"time"}
                  fontSize={"xl"}
                  disabled={editable}
                  id={day[0] + "OpenTime"}
                  {...register2(day[0] + "OpenTime")}
                  defaultValue={schedule && day[1].open}
                />
                <Input
                  type={"time"}
                  fontSize={"xl"}
                  disabled={editable}
                  id={day[0] + "ClosedTime"}
                  {...register2(day[0] + "ClosedTime")}
                  defaultValue={schedule && day[1].closed}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors2.name && errors2.location?.message}
              </FormErrorMessage>
            </FormControl>
          );
        })}
    </>
  );
}
