import { IconButton } from '@chakra-ui/button';
import { VStack, Text } from '@chakra-ui/layout';
// import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

const PostVote = ({ score }) => {
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
