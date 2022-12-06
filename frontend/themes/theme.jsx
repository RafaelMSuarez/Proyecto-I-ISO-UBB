import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      body: {
        bg: "#1E1F1F",
      },
    }),
  },
});

export default theme;
