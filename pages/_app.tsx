import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  yellow: {
    300: "#ffd500",
    400: "#ffc300",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
