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
import { MdReport } from "react-icons/md";

const ReportAlert = ({ pressReport, isReported }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <IconButton
        _hover={{ color: "#dc1919" }}
        _active={{ bg: "#484b4b" }}
        variant={"ghost"}
        fontSize={"20px"}
        isActive={isReported}
        icon={<Icon as={MdReport} />}
        onClick={onOpen}
      />

      {isReported ? (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogBody
                fontSize={"lg"}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                Ya reportó esta publicación
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      ) : (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Reportar publicación
              </AlertDialogHeader>

              <AlertDialogBody>
                Este reporte no se puede eliminar, ¿Continuar?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    pressReport();
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
      )}
    </>
  );
};

export default ReportAlert;
