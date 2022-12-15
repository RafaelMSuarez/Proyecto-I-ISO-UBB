import React from "react";
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
  Icon
} from "@chakra-ui/react";

import { MdThumbUp, MdThumbDown, MdChat } from "react-icons/md";

const Anuncio = ({ title, name, desc, likes, dislikes, numComments, numCasa, hora }) => {
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
        <Flex
          justifyContent={"space-between"}
          fontSize={"1.75rem"}
          fontWeight="bold"
        >
          <Text>{name}</Text>
          <Text>{numCasa}</Text>
        </Flex>
        <Text fontSize={"1rem"} fontStyle={"italic"} color={"grey"}>{hora}</Text>
      </CardHeader>
      <Center px={"15px"}>
        <Divider borderColor={"#9FE8E8"} border={"1px"} />
      </Center>
      <CardBody px={"15px"}>
        <Stack>
          <Text fontSize={"1.5rem"}>{title}</Text>
          <Text fontSize={"1rem"} textAlign={"justify"}>
            {desc}
          </Text>
        </Stack>
      </CardBody>
      <Image
        objectFit={"cover"}
        alt="imagen"
        maxW={"100%"}
        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-pizza-on-table-royalty-free-image-995467932-1559051477.jpg"
      />
      <CardFooter justify={"space-between"} p={"5px"}>
        <HStack spacing={"0"}>
          <Button
            _hover={{ color: "#9FE8E8" }}
            _active={{ bg: "#484b4b" }}
            variant={"ghost"}
            leftIcon={<Icon as={MdThumbUp} />}
          >
            {likes}
          </Button>
          <Button
            _hover={{ color: "#9FE8E8" }}
            _active={{ bg: "#484b4b" }}
            variant={"ghost"}
            leftIcon={<Icon as={MdThumbDown} />}
          >
            {dislikes}
          </Button>
        </HStack>
        <Button
          _hover={{ color: "#9FE8E8" }}
          _active={{ bg: "#484b4b" }}
          variant={"ghost"}
          leftIcon={<Icon as={MdChat} />}
        >
          {numComments} comentarios
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Anuncio;
