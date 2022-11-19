import { Box, Button, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { getPaginatedUpdates } from "../../lib/db";

function Pagination() {
  const [updates, setUpdates] = useState(null);
  const [latestDoc, setLatestDoc] = useState();
  const [emptyUpdates, setEmptyUpdates] = useState();
  const [loading, setLoading] = useState();

  const handleClick = async () => {
    const newUpdates = await getPaginatedUpdates(latestDoc);
    setLoading(true);
    if (newUpdates.docs.length === 0) {
      console.log("empty");
      setEmptyUpdates(true);
      setLoading(false);
      return;
    }
    const lastDoc = newUpdates.docs[newUpdates.docs.length - 1];
    const updatesArray = [];
    newUpdates.forEach((doc) => {
      updatesArray.push(doc.data());
    });

    setUpdates((prev) => [...prev, ...updatesArray]);

    setLatestDoc(lastDoc);
    setLoading(false);
  };

  const getUpdates = async () => {
    setLoading(true);
    const response = await getPaginatedUpdates();
    const lastDoc = response.docs[response.docs.length - 1];
    const updatesArray = [];
    response.forEach((doc) => {
      updatesArray.push(doc.data());
    });
    setUpdates(updatesArray);
    setLatestDoc(lastDoc);
    setLoading(false);
  };
  const containerBox = useRef();

  const handleScroll = () => {
    console.log("scrolling!");
    let triggeHeight =
      containerBox.current.scrollTop + containerBox.current.offsetHeight;

    if (triggeHeight >= containerBox.current.scrollHeight) {
      handleClick();
    }
  };

  useEffect(() => {
    getUpdates();
  }, []);

  return (
    <>
      <Box
        maxHeight={"80vh"}
        backgroundColor={"blue.400"}
        boxSizing={"border-box"}
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        onScroll={handleScroll}
        ref={containerBox}
      >
        {updates &&
          updates.map((update, i) => {
            return (
              <Box
                key={i}
                backgroundColor={"red.400"}
                width={"100%"}
                height={"25vh"}
              >
                <Heading m={8}>{update.body}</Heading>
              </Box>
            );
          })}
        {emptyUpdates ? (
          <Box backgroundColor={"red.400"} width={"100%"} height={"25vh"}>
            <Heading m={8}>All caught up</Heading>
          </Box>
        ) : null}

        {loading || emptyUpdates === true ? null : <Spinner />}
      </Box>
      {loading ? <Spinner /> : null}
    </>
  );
}

export default Pagination;
