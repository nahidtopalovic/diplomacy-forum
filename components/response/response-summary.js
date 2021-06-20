import Link from 'next/link';
import slug from 'slug';
import { Flex, HStack, Box, Text, Heading } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/react';

const ResponseSummary = ({
    id,
    title,
    tags,
    author,
    createdTime,
    children,
}) => {
    return (
        <Flex bg="gray.200" direction="column" align="flex-start">
            <Link
                href="/responses/[slug]"
                as={`/questions/${id}-${slug(title)}`}
            >
                <a>
                    <Heading fontSize="xl">{title}</Heading>
                </a>
            </Link>
            <Text noOfLines={3}>{children}</Text>
            <HStack spacing={2}>
                {tags.map((tag) => (
                    <Tag
                        size="md"
                        key={tag}
                        variant="solid"
                        colorScheme="linkedin"
                    >
                        {tag}
                    </Tag>
                ))}
            </HStack>
            <HStack>
                <Box>Created by {author.username}</Box>
                <Box>asked on {createdTime}</Box>
            </HStack>
        </Flex>
    );
};

export default ResponseSummary;
