import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  function convertToIST(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);
    const istTime = utcDate.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    return istTime;
  }
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#B9F5D0" : "#BEE3F8"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                textAlign: "start",
                marginTop: isSameUser(messages, m, i, user._id) ? 2 : 10,
                borderRadius: "15px",
                padding: "5px 15px",
                minWidth: "120px",
                maxWidth: "75%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {m.content}
              <span
                style={{
                  fontSize: "8px",
                  textAlign: "right",
                }}
              >
                {convertToIST(m.createdAt)}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
