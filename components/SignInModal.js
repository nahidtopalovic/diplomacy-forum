import { useContext, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Heading,
    Icon,
    Center,
} from '@chakra-ui/react';
import { RiQuestionAnswerFill } from 'react-icons/ri';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase, auth } from '../utils/db/firebase';
import { useAuth } from '../context/AuthUserContext';
import ModalContext from '../context/Modal';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
        },
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

const SignInModal = () => {
    const { authUser } = useAuth();
    const { isOpen, onClose } = useContext(ModalContext);

    useEffect(() => {
        const closeModal = async () => {
            if (authUser) {
                setTimeout(() => {
                    onClose();
                }, 500);
            }
        };

        closeModal();
    }, [authUser]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex flex={{ base: 1 }} justify="center" mb={10}>
                            <Heading
                                textAlign="center"
                                color="#5B86E5"
                                size="md"
                            >
                                <Icon as={RiQuestionAnswerFill} />
                            </Heading>
                            <Heading
                                textAlign="center"
                                bgGradient="linear(to-l, #36D1DC,#5B86E5)"
                                bgClip="text"
                                size="md"
                            >
                                DiplomacyDojo
                            </Heading>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={auth}
                        />
                        {authUser ? (
                            <Center>
                                <Heading size="md">
                                    Signed in successfully
                                </Heading>
                            </Center>
                        ) : null}
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SignInModal;
