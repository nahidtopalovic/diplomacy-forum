import { useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import { IconButton } from '@chakra-ui/button';
import { VStack, Text } from '@chakra-ui/layout';
import { useAuth } from '../../context/AuthUserContext';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import ModalContext from '../../context/Modal';

const PostVote = ({ score, votes, postId, commentId, setPost }) => {
    const { authAxios } = useContext(FetchContext);
    const { authUser } = useAuth();
    const { onOpen } = useContext(ModalContext);

    const isAuthenticated = () => {
        if (!authUser) {
            return false;
        }
        return true;
    };
    const isUpVoted = () => {
        return votes.find((vote) => vote.user === authUser?.id)?.vote === 1;
    };

    const isDownVoted = () => {
        return votes.find((vote) => vote.user === authUser?.id)?.vote === -1;
    };

    const upVote = async () => {
        const { data } = await authAxios.post(
            `votes/upvote/${postId}/?comment=${commentId ? commentId : ''}`
        );

        setPost(data);
    };

    const downVote = async () => {
        const { data } = await authAxios.post(
            `votes/downvote/${postId}/?comment=${commentId ? commentId : ''}`
        );

        setPost(data);
    };

    const unVote = async () => {
        const { data } = await authAxios.post(
            `votes/unvote/${postId}/?comment=${commentId ? commentId : ''}`
        );

        setPost(data);
    };

    return (
        <div>
            <VStack direction="column" align="center" justify="center" mr={3}>
                <IconButton
                    aria-label="Upvote post"
                    size="md"
                    variant="ghost"
                    fontSize="25px"
                    color={isUpVoted() ? 'linkedin.400' : ''}
                    icon={<BiUpvote />}
                    onClick={() =>
                        isAuthenticated()
                            ? isUpVoted()
                                ? unVote()
                                : upVote()
                            : onOpen()
                    }
                >
                    Up
                </IconButton>
                <Text size="xs">{score}</Text>
                <IconButton
                    aria-label="Downvote post"
                    size="md"
                    fontSize="25px"
                    variant="ghost"
                    color={isDownVoted() ? 'linkedin.400' : ''}
                    icon={<BiDownvote />}
                    onClick={() => {
                        isAuthenticated()
                            ? isDownVoted()
                                ? unVote()
                                : downVote()
                            : onOpen();
                    }}
                >
                    Down
                </IconButton>
            </VStack>
        </div>
    );
};

export default PostVote;
