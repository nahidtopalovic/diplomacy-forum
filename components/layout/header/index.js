import { RiQuestionAnswerFill } from 'react-icons/ri';
import { Icon } from '@chakra-ui/icon';
import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';

const Header = () => {
    return (
        <Box>
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
                    <Text
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                    >
                        <Icon as={RiQuestionAnswerFill} />
                    </Text>
                    <Text
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                    >
                        DiplomacyDojo
                    </Text>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'#'}
                    >
                        Sign In
                    </Button>
                    <Button
                        display={{ base: 1, md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'blue.400'}
                        href={'#'}
                        _hover={{
                            bg: 'blue.800',
                        }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
};

export default Header;
