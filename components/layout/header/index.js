import { RiQuestionAnswerFill } from 'react-icons/ri';
import { Icon } from '@chakra-ui/icon';
import Link from 'next/link';
import {
    Box,
    Flex,
    Heading,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';
import styles from './header.module.css';
import SignIn from '../../SignInModal';

const Header = () => {
    return (
        <Box className={styles.header} bg="white">
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                >
                    <Heading
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        color={'#5B86E5'}
                        size="md"
                    >
                        <Icon as={RiQuestionAnswerFill} />
                    </Heading>
                    <Heading
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        bgGradient="linear(to-l, #36D1DC,#5B86E5)"
                        bgClip="text"
                        size="md"
                    >
                        <Link href="/">
                            <a>DiplomacyDojo</a>
                        </Link>
                    </Heading>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    <SignIn />
                    <Button
                        display={{ base: 1, md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg="linkedin.500"
                        href={'#'}
                        _hover={{
                            bg: 'blue.800',
                        }}
                        size={('xs', 'md')}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
};

export default Header;
