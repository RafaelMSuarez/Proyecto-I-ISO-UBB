import "../styles/globals.css";
import theme from "../themes/theme";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { PostsContextProvider } from "../context/PostsContext";

function MyApp({ Component, pageProps }) {
  axios.defaults.withCredentials = true;

  return (
    <PostsContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </PostsContextProvider>
  );
}

export default MyApp;
