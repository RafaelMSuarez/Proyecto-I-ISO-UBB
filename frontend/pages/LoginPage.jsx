import { useState } from "react";
import {
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

import { login } from "../data/user";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useUserStore } from "../store/userStore";
import { getUser } from "../data/user";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    rut: "",
  });
  const setId = useUserStore((state) => state.setId);
  const setName = useUserStore((state) => state.setName);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await login(user.rut);
      if (res.status === 200) {
        Cookies.set("token", res.data.token, {
          expires: 1,
          sameSite: "None",
          secure: true,
        });
        const userData = await getUser(user.rut);
        setName(userData.name);
        setId(userData._id);
        setIsLoading(false);
        router.push(`/home/${userData._id}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("Error al iniciar sesión");
    }
  };
  return (
    <Container maxW={"container.md"}>
      <VStack color={"white"} my={"40px"}>
        <Heading>Inicio de sesión</Heading>
        <FormControl>
          <FormLabel>RUT</FormLabel>
          <Input name="rut" onChange={handleChange} />
        </FormControl>
      </VStack>
      <Button disabled={isLoading} onClick={onSubmit} my={"40px"}>
        Iniciar Sesión
      </Button>
    </Container>
  );
};

export default LoginPage;
