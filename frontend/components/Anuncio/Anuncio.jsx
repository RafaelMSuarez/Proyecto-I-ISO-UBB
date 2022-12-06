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

const Anuncio = ({ titulo }) => {
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
          <Text>Rafael Martínez</Text>
          <Text>19</Text>
        </Flex>
        <Text fontSize={"1rem"}>3 h</Text>
      </CardHeader>
      <Center px={"15px"}>
        <Divider borderColor={"#ffb4ab"} border={"1px"} />
      </Center>
      <CardBody>
        <Stack>
          <Text fontSize={"1.5rem"}>{titulo}</Text>
          <Text fontSize={"1rem"} textAlign={"justify"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            ab consequuntur quidem assumenda impedit ratione autem repudiandae
            incidunt? Veritatis exercitationem ratione harum cumque explicabo
            perferendis similique itaque, illo quam quidem?
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
            4
          </Button>
          <Button
            _hover={{ color: "#9FE8E8" }}
            _active={{ bg: "#484b4b" }}
            variant={"ghost"}
            leftIcon={<Icon as={MdThumbDown} />}
          >
            1
          </Button>
        </HStack>
        <Button
          _hover={{ color: "#9FE8E8" }}
          _active={{ bg: "#484b4b" }}
          variant={"ghost"}
          leftIcon={<Icon as={MdChat} />}
        >
          3 comentarios
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Anuncio;
