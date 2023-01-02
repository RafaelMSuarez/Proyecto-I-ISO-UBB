import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Text,
  Divider,
  Stack,
  Image,
  Button,
  HStack,
  Center,
  Icon,
  IconButton,
} from "@chakra-ui/react";

import { MdThumbUp, MdThumbDown, MdChat, MdReport } from "react-icons/md";
import { usePostsContext } from "../../hooks/usePostsContext";
import { useState, useEffect, useRef } from "react";
import { darLike, quitarLike } from "../../data/likes";
import { useUserStore } from "../../store/userStore";
import DeleteAlert from "../Alerts/DeleteAlert";

const AnuncioUser = ({
  postId,
  title,
  desc,
  numLikes,
  numComments,
  hora,
  img,
  isLiked,
  isReported,
  refresh,
}) => {
  const [like, setLike] = useState(isLiked);
  // const [report, setReport] = useState(isReported);
  const [numdeLikes, setNumdeLikes] = useState(numLikes);
  const userId = useUserStore((state) => state.userId);

  const pressLike = (postId) => {
    if (like) {
      setNumdeLikes(numdeLikes - 1);
      const res = quitarLike(postId, userId);
      if (res.status === 200) {
      }
    } else {
      setNumdeLikes(numdeLikes + 1);
      const res = darLike(postId, userId);
      if (res.status === 200) {
      }
    }
    setLike(!like);
  };

  return (
    <Card
      rounded={"10px"}
      boxShadow={"0px 2px 4px 1px rgba(0, 0, 0, 0.25)"}
      maxW={"sm"}
      bgColor="#353535"
      color="#E0E3E3"
      _hover={{ bg: "#393939" }}
    >
      <CardHeader p={"15px"}>
        <Text fontSize={"1.75rem"} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize={"1rem"} fontStyle={"italic"} color={"grey"}>
          {hora}
        </Text>
      </CardHeader>
      <Center px={"15px"}>
        <Divider borderColor={"#9FE8E8"} border={"1px"} />
      </Center>
      <CardBody px={"15px"}>
        <Stack>
          <Text fontSize={"1rem"} textAlign={"justify"}>
            {desc}
          </Text>
        </Stack>
      </CardBody>
      {/* <Image objectFit={"cover"} alt="imagen" maxW={"100%"} src={img} /> */}
      <CardFooter justify={"space-between"} p={"5px"}>
        <HStack spacing={"0"}>
          <Button
            _hover={{ color: "#9FE8E8" }}
            _active={{ bg: "#484b4b" }}
            variant={"ghost"}
            leftIcon={<Icon as={MdThumbUp} />}
            isActive={like}
            onClick={() => pressLike(postId)}
          >
            {numdeLikes}
          </Button>
          <Button
            _hover={{ color: "#9FE8E8" }}
            _active={{ bg: "#484b4b" }}
            variant={"ghost"}
            leftIcon={<Icon as={MdChat} />}
          >
            {numComments} comentarios
          </Button>
        </HStack>
        <DeleteAlert postId={postId} />
      </CardFooter>
    </Card>
  );
};

export default AnuncioUser;
