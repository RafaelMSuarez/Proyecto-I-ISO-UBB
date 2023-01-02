import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  IconButton,
  Icon,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Divider,
  Textarea,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { MdAdd } from "react-icons/md";
import { newPost } from "../../data/anuncios";
import { usePostsContext } from "../../hooks/usePostsContext";

const NewPostButton = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const router = useRouter();
  const { dispatch } = usePostsContext();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleErr(false);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
    setDescErr(false);
  };

  const validate = () => {
    let error = false;
    if (title === "") {
      setTitleErr(true);
      error = true;
    }
    if (desc === "") {
      setDescErr(true);
      error = true;
    }
    if (error) {
      return false;
    }
    return true;
  };

  const addNewPost = async () => {
    const user = router.query.PostsPage;
    const res = await newPost(user, title, desc);
    if (res.status === 200) {
      dispatch({ type: "new_post", payload: res.data });
    } else {
      return (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Nueva publicación
              </AlertDialogHeader>

              <AlertDialogBody>Error al crear la publicación</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    onClose();
                  }}
                  ml={3}
                >
                  Aceptar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      );
    }
  };

  return (
    <>
      <Button
        pos={"fixed"}
        bottom={"0"}
        right={"0"}
        margin={"1rem"}
        color={"#1E1F1F"}
        fontSize={"1.3rem"}
        padding={"1.8rem"}
        display={{ base: "none", lg: "flex" }}
        onClick={() => {
          setDesc("");
          setTitle("");
          onOpen();
        }}
      >
        Nueva publicación
      </Button>
      <IconButton
        pos={"fixed"}
        bottom={"0"}
        right={"0"}
        margin={"1rem"}
        color={"#1E1F1F"}
        fontSize={"2rem"}
        size={"lg"}
        icon={<Icon as={MdAdd} />}
        display={{ lg: "none", base: "flex" }}
        isRound
        onClick={() => {
          setDesc("");
          setTitle("");
          setTitleErr(false);
          setDescErr(false);
          onOpen();
        }}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Nueva publicación
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isInvalid={titleErr}>
                <FormLabel>Título</FormLabel>
                <Input
                  value={title}
                  placeholder={"Ingrese el título"}
                  maxLength={50}
                  onChange={handleTitleChange}
                />
                {titleErr ? (
                  <FormErrorMessage>Título requerido</FormErrorMessage>
                ) : (
                  <FormHelperText
                    textAlign={"right"}
                  >{`${title.length} / 50`}</FormHelperText>
                )}
              </FormControl>
              <Divider my={"2rem"} />
              <FormControl isInvalid={descErr}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  value={desc}
                  onChange={handleDescChange}
                  placeholder={"Contenido de la publicación"}
                  maxLength={500}
                />
                {descErr ? (
                  <FormErrorMessage>Ingrese descripción</FormErrorMessage>
                ) : (
                  <FormHelperText
                    textAlign={"right"}
                  >{`${desc.length} / 500`}</FormHelperText>
                )}
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (validate()) {
                    addNewPost();
                    onClose();
                  }
                }}
                ml={3}
              >
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default NewPostButton;
