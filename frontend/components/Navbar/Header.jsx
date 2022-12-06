import {
  IconButton,
  Flex,
  Box,
  VStack,
  useDisclosure,
  Icon,
  HStack,
  Text,
  Divider,
  Center,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { MdClose, MdMenu } from "react-icons/md";

const Header = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      bg={"#353535"}
      fontSize={"1.3rem"}
      color={"#E0E3E3"}
      // zIndex={"sticky"}
      // position={"fixed"}
      // top={"0"}
      // w={"100%"}
    >
      <Flex
        h={"4rem"}
        pl={"1rem"}
        pr={{ md: "2rem", base: "1rem" }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack>
          <Avatar name="Rafael" />
          <Text fontWeight={"bold"}>Rafael Martínez</Text>
        </HStack>

        <HStack alignItems={"center"} spacing={"1rem"}>
          <HStack
            alignItems={"center"}
            spacing={"1.5rem"}
            as={"nav"}
            display={{ base: "none", md: "flex" }}
          >
            <Text _hover={{ color: "#9FE8E8" }}>Inicio</Text>
            <Flex h={"4rem"} alignItems={"center"} py={"1.2rem"}>
              <Divider
                orientation={"vertical"}
                borderColor={"#ffb4ab"}
                border={"1px"}
              />
            </Flex>
            <Text _hover={{ color: "#9FE8E8" }}>Publicaciones</Text>
          </HStack>
          <IconButton
            icon={isOpen ? <Icon as={MdClose} /> : <Icon as={MdMenu} />}
            aria-label={"Abrir menú"}
            variant={"ghost"}
            fontWeight={"bold"}
            fontSize={"1.5rem"}
            _hover={{ color: "#9FE8E8", bg: "#484b4b" }}
            _active={{ bg: "#484b4b" }}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={"1rem"} display={{ md: "none" }}>
          <VStack as={"nav"} alignItems={"end"} pr={"1.8rem"}>
            <Text _hover={{ color: "#9FE8E8" }}>Inicio</Text>
            <Text _hover={{ color: "#9FE8E8" }}>Publicaciones</Text>
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
