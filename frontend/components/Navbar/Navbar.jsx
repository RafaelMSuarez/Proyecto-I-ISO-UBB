import {
  IconButton,
  Flex,
  Box,
  useDisclosure,
  Icon,
  HStack,
  Text,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { MdClose, MdMenu } from "react-icons/md";

const Navbar = ({}) => {
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
                // borderColor={"#ffb4ab"}
                borderColor={"#9FE8E8"}
                border={"1px"}
              />
            </Flex>
            <Text _hover={{ color: "#9FE8E8" }}>Mis Publicaciones</Text>
          </HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={isOpen ? <Icon as={MdClose} /> : <Icon as={MdMenu} />}
              variant={"ghost"}
              fontWeight={"bold"}
              fontSize={"1.5rem"}
              _hover={{ color: "#9FE8E8", bg: "#484b4b" }}
              _active={{ bg: "#484b4b" }}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <MenuList
              mt={"0.45rem"}
              directi
              bg={"#1E1E1E"}
              border={"#9FE8E8 1px solid"}
              borderRadius={"5px 0px 5px 5px"}
            >
              <MenuItem bg={""} _hover={{ color: "#9FE8E8", bg: "#262626" }}>
                Inicio
              </MenuItem>
              <MenuItem bg={""} _hover={{ color: "#9FE8E8", bg: "#262626" }}>
                Mis Publicaciones
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
