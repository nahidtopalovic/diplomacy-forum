import Link from 'next/link';
import slug from 'slug';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Flex, Stack, VStack, Text, Heading, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

const PostSummary = ({ id, title, tags, author, createdTime, children }) => {
    return (
        <Box>
            <Link href="/posts/[slug]" as={`/posts/${id}-${slug(title)}`}>
                <a>
                    <Heading noOfLines={2} fontSize="xl">
                        {title}
                    </Heading>
                </a>
            </Link>
            <Text noOfLines={2}>{children}</Text>
            <Flex justifyContent="space-between">
                <Stack
                    direction="row"
                    spacing={[1, 2]}
                    wrap="wrap"
                    w="fit-content"
                >
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={{ pathname: '/', query: { tag: tag } }}
                        >
                            <Button
                                mb={1}
                                size="xs"
                                variant="solid"
                                colorScheme="linkedin"
                            >
                                {tag}
                            </Button>
                        </Link>
                    ))}
                </Stack>
                <VStack align="start">
                    <Text fontSize="xs">
                        posted{' '}
                        {formatDistanceToNowStrict(new Date(createdTime), {
                            addSuffix: true,
                        })}
                    </Text>
                    <Text fontSize="xs">by {author.username}</Text>
                </VStack>
            </Flex>
        </Box>
    );
};

export default PostSummary;
