import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Flex,
    Heading,
    Icon,
} from '@chakra-ui/react';
import { RiQuestionAnswerFill } from 'react-icons/ri';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase, auth } from '../utils/db/firebase';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

const SignIn = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                onClick={onOpen}
                fontSize={'sm'}
                fontWeight={400}
                size={('xs', 'md')}
            >
                Sign In
            </Button>

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
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="linkedin" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SignIn;
