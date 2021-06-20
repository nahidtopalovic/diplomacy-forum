import { Flex, Text } from '@chakra-ui/layout';

const ResponseStats = ({ voteCount, answerCount, view }) => {
    return (
        <Flex
            color="gray.600"
            direction="column"
            bg="blue.100"
            justify="center"
            align="center"
        >
            <Text fontSize="lg">{voteCount}</Text>
            <Text fontSize="xs">votes</Text>
            <Text fontSize="lg">{answerCount}</Text>
            <Text fontSize="xs" pb={4}>
                answers
            </Text>
            <Text fontSize="xs">{view}</Text>
            <Text fontSize="xs">views</Text>
        </Flex>
    );
};

export default ResponseStats;
