import { ChakraProvider } from '@chakra-ui/react';
import { AuthUserProvider } from '../context/AuthUserContext';
import { FetchProvider } from '../context/FetchContext';

function MyApp({ Component, pageProps }) {
    return (
        <AuthUserProvider>
            <FetchProvider>
                <ChakraProvider>
                    <Component {...pageProps} />;
                </ChakraProvider>
            </FetchProvider>
        </AuthUserProvider>
    );
}

export default MyApp;
