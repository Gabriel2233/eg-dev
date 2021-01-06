import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { FavContextProvider } from '../src/contexts/FavoritesContext';
import { SearchContextProvider } from '../src/contexts/SearchContext';
import { AuthProvider } from '../src/firebaseLib/auth';

const colors = {
  red: {
    400: '#d90429',
    500: '#ef233c',
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchContextProvider>
        {' '}
        <FavContextProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </FavContextProvider>
      </SearchContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
