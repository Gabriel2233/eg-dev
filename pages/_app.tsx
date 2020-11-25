import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../src/firebaseLib/auth";

import "draft-js/dist/Draft.css";

const colors = {
  yellow: {
    300: "#ffd500",
    400: "#ffc300",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
