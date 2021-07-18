import { useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import { IconButton } from '@chakra-ui/button';
import { VStack, Text } from '@chakra-ui/layout';
import { useAuth } from '../../context/AuthUserContext';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import ModalContext from '../../context/Modal';

const PostVote = ({
    post,
    comment,
    score,
    votes,
    postId,
    commentId,
    setPost,
    fetchPost,
}) => {
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
        try {
            // optimistic update
            const newVotes = [...votes].filter(
                (vote) => vote.user !== authUser.id
            );
            newVotes.push({ user: authUser.id, vote: 1 });

            const prevVote = votes.filter(
                (vote) => vote.user === authUser.id
            )[0]?.vote;

            let newPost = {};
            if (!comment) {
                newPost = {
                    ...post,
                    score: prevVote ? score + 2 : score + 1,
                    votes: newVotes,
                };
            } else {
                const newComment = {
                    ...comment,
                    score: prevVote ? score + 2 : score + 1,
                    votes: newVotes,
                };
                const newAnswers = post.answers.map((answer) =>
                    answer.id === comment.id ? newComment : answer
                );
                newPost = {
                    ...post,
                    answers: newAnswers,
                };
            }

            setPost(newPost);

            const link = commentId
                ? `votes/upvote/${postId}/?comment=${commentId}`
                : `votes/upvote/${postId}/`;
            await authAxios.post(link);
        } catch (err) {
            // revert if something fails
            fetchPost();
            console.log(err);
        }
    };

    const downVote = async () => {
        try {
            // optimistic update
            const newVotes = [...votes].filter(
                (vote) => vote.user !== authUser.id
            );
            newVotes.push({ user: authUser.id, vote: -1 });

            const prevVote = votes.filter(
                (vote) => vote.user === authUser.id
            )[0]?.vote;

            let newPost = {};
            if (!comment) {
                newPost = {
                    ...post,
                    score: prevVote ? score - 2 : score - 1,
                    votes: newVotes,
                };
            } else {
                const newComment = {
                    ...comment,
                    score: prevVote ? score - 2 : score - 1,
                    votes: newVotes,
                };
                const newAnswers = post.answers.map((answer) =>
                    answer.id === comment.id ? newComment : answer
                );
                newPost = {
                    ...post,
                    answers: newAnswers,
                };
            }

            setPost(newPost);

            const link = commentId
                ? `votes/downvote/${postId}/?comment=${commentId}`
                : `votes/downvote/${postId}/`;
            await authAxios.post(link);
        } catch (err) {
            // revert if something fails
            fetchPost();
            console.log(err);
        }
    };

    const unVote = async () => {
        try {
            // optimistic update
            const newVotes = [...votes].filter(
                (vote) => vote.user !== authUser.id
            );

            const prevVote = votes.filter(
                (vote) => vote.user === authUser.id
            )[0]?.vote;

            let newPost = {};
            if (!comment) {
                newPost = {
                    ...post,
                    score: prevVote ? score - prevVote : score,
                    votes: newVotes,
                };
            } else {
                const newComment = {
                    ...comment,
                    score: prevVote ? score - prevVote : score,
                    votes: newVotes,
                };
                const newAnswers = post.answers.map((answer) =>
                    answer.id === comment.id ? newComment : answer
                );
                newPost = {
                    ...post,
                    answers: newAnswers,
                };
            }

            setPost(newPost);

            const link = commentId
                ? `votes/unvote/${postId}/?comment=${commentId}`
                : `votes/unvote/${postId}/`;
            await authAxios.post(link);
        } catch (err) {
            // revert if something fails
            fetchPost();
            console.log(err);
        }
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
