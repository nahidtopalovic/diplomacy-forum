// import { authAxios } from '../../context/FetchContext';
import { IconButton } from '@chakra-ui/button';
import { VStack, Text } from '@chakra-ui/layout';
// import { useAuth } from '../../context/AuthUserContext';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

const PostVote = ({ score }) => {
    // const { authUser } = useAuth();
    // add as props: votes, postId, commentId, setPost
    // const isUpVoted = () => {
    //     return votes.find((vote) => vote.user === authUser?.id)?.vote === 1;
    // };

    // const isDownVoted = () => {
    //     return votes.find((vote) => vote.user === authUser?.id)?.vote === -1;
    // };

    // const upVote = async () => {
    //     const { data } = await authAxios.get(
    //         `votes/upvote/${postId}/${commentId ? commentId : ''}`
    //     );
    //     setPost(data);
    // };

    // const downVote = async () => {
    //     const { data } = await authAxios.get(
    //         `votes/downvote/${postId}/${commentId ? commentId : ''}`
    //     );
    //     setPost(data);
    // };

    // const undoVote = async () => {
    //     const { data } = await authAxios.get(
    //         `votes/undovote/${postId}/${commentId ? commentId : ''}`
    //     );
    //     setPost(data);
    // };

    return (
        <div>
            <VStack direction="column" align="center" justify="center" mr={3}>
                <IconButton
                    aria-label="Upvote post"
                    size="md"
                    variant="ghost"
                    fontSize="25px"
                    icon={<BiUpvote />}
                >
                    Up
                </IconButton>
                <Text size="xs">{score}</Text>
                <IconButton
                    aria-label="Downvote post"
                    size="md"
                    fontSize="25px"
                    variant="ghost"
                    icon={<BiDownvote />}
                >
                    Down
                </IconButton>
            </VStack>
        </div>
    );
};

export default PostVote;
