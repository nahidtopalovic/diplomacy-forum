import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Flex, HStack, VStack, Text, Spacer, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

const PostDetailedSummary = ({ tags, author, createdTime, children }) => {
    return (
        <Flex direction="column" mt={1} justify="space-around">
            <Box w={['xs', '2xl']}>
                <Text maxW={['xs', '2xl']}>{children}</Text>
            </Box>

            <Flex direction="column" align="space-between">
                <Flex align="flex-end">
                    {tags && (
                        <HStack spacing={2}>
                            {tags.map((tag) => (
                                <Button
                                    key={tag}
                                    size="xs"
                                    variant="solid"
                                    colorScheme="linkedin"
                                >
                                    {tag}
                                </Button>
                            ))}
                        </HStack>
                    )}
                    <Spacer />
                    <VStack mt="2" align="start" pr={3}>
                        <Text fontSize="xs">
                            asked{' '}
                            {formatDistanceToNowStrict(new Date(createdTime), {
                                addSuffix: true,
                            })}
                        </Text>
                        <Text fontSize="xs">by {author.username}</Text>
                    </VStack>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default PostDetailedSummary;
