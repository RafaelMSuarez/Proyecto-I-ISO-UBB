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
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { deletePost } from "../../data/anuncios";
import { usePostsContext } from "../../hooks/usePostsContext";

const DeleteAlert = ({ postId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { dispatch } = usePostsContext();

  const deleteAnuncio = async () => {
    const res = await deletePost(postId);

    if (res.status === 200) {
      dispatch({ type: "delete_post", payload: postId });
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
                Eliminar publicación
              </AlertDialogHeader>

              <AlertDialogBody>
                Error al eliminar la publicación
              </AlertDialogBody>

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
      <IconButton
        _hover={{ color: "#dc1919" }}
        _active={{ bg: "#484b4b" }}
        variant={"ghost"}
        fontSize={"20px"}
        icon={<Icon as={MdDelete} />}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar publicación
            </AlertDialogHeader>

            <AlertDialogBody>
              La publicación será eliminada y no se puede recuperar, ¿Continuar?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  deleteAnuncio();
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

export default DeleteAlert;
