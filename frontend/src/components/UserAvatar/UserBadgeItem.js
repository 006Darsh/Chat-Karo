import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin, updategroup }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
    >
      {user.name}
      {updategroup ? (
        <>
          {admin ? admin._id === user._id && <span> (Admin)</span> : <></>}
          {admin ? (
            admin._id !== user._id && (
              <CloseIcon pl={1} onClick={handleFunction} />
            )
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <CloseIcon pl={1} onClick={handleFunction} />
        </>
      )}
    </Badge>
  );
};

export default UserBadgeItem;
