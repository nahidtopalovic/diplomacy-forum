import { useState, useContext } from 'react';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Flex, HStack, VStack, Text, Spacer, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import AlertDialogPost from '../AlertDialogPost';
import { FetchContext } from '../../context/FetchContext';

const PostDetailedSummary = ({
    tags,
    author,
    createdTime,
    children,
    isAuthor,
    typeOfPost,
    postId,
    commentId,
    removeCommentFromPost,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { authAxios } = useContext(FetchContext);

    const handleDeleteComment = async (postId, commentId) => {
        try {
            const link = `posts/comment/${commentId}/?postId=${postId}`;
            await authAxios.delete(link);

            // update view
            removeCommentFromPost(commentId);
        } catch (err) {
            console.log(err);
        }
    };

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
                            posted{' '}
                            {formatDistanceToNowStrict(new Date(createdTime), {
                                addSuffix: true,
                            })}
                        </Text>
                        <Text fontSize="xs">by {author.username}</Text>
                        {isAuthor && (
                            <>
                                <Button
                                    colorScheme="red"
                                    variant="outline"
                                    size="xs"
                                    w="60px"
                                    onClick={() => setIsOpen(true)}
                                >
                                    Delete
                                </Button>
                                <AlertDialogPost
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    typeOfPost={typeOfPost}
                                    postId={postId}
                                    commentId={commentId}
                                    onDelete={handleDeleteComment}
                                />
                            </>
                        )}
                    </VStack>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default PostDetailedSummary;
