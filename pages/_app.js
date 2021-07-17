import { useDisclosure } from '@chakra-ui/hooks';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthUserProvider } from '../context/AuthUserContext';
import { FetchProvider } from '../context/FetchContext';
import ModalContext from '../context/Modal';
import SignInModal from '../components/SignInModal';

function MyApp({ Component, pageProps }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
            <AuthUserProvider>
                <FetchProvider>
                    <ChakraProvider>
                        <Component {...pageProps} />
                        <SignInModal />
                    </ChakraProvider>
                </FetchProvider>
            </AuthUserProvider>
        </ModalContext.Provider>
    );
}

export default MyApp;
