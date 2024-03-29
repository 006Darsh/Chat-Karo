import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender, getSenderPic } from "../config/ChatLogics";
import GroupChatModal from "./Miscellaneous/GroupChatModal";
const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats, loggedUser } =
    ChatState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const apiUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await fetch(`${apiUrl}/api/chat`, {
          headers: config.headers,
        });
        const data = await response.json();
        setChats(data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "failed to load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      }
    };
    fetchChats();
  }, [toast, user.token, setChats, fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "17px", md: "17px", lg: "25px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "13px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h={{ base: "79vh", md: "75vh", lg: "75vh", xl: "78vh" }}
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY={"scroll"} w={"100%"}>
            {loading && <ChatLoading />}
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                }}
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                display={"flex"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Avatar
                  mr={2}
                  mt={chat.latestMessage ? 2 : 0}
                  size={"sm"}
                  cursor={"pointer"}
                  name={
                    !chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName
                  }
                  src={
                    !chat.isGroupChat && getSenderPic(loggedUser, chat.users)
                  }
                />
                <Box>
                  <Text mt={chat.latestMessage ? 0 : 1}>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage ? (
                    <Text color={selectedChat === chat ? "white" : "GrayText"}>
                      {!chat.isGroupChat
                        ? chat.latestMessage.content
                        : chat.latestMessage.sender._id === loggedUser._id
                        ? `You: ${chat.latestMessage.content}`
                        : `${chat.latestMessage.sender.name}: ${chat.latestMessage.content}`}
                    </Text>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <p>No Chats found.</p>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
