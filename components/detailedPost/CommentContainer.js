import React from 'react';

import { Flex, Heading } from '@chakra-ui/layout';
import SortingButtons from '../SortingButtons';

const CommentContainer = ({
    commentCount,
    commentSortType,
    setCommentSortType,
    children,
}) => {
    return (
        <Flex direction="column">
            <Flex justify="space-between" mb={4}>
                <Heading size="xs">{commentCount} Comments</Heading>
                <SortingButtons
                    buttons={['Votes', 'Newest', 'Oldest']}
                    selected={commentSortType}
                    setSelected={setCommentSortType}
                />
            </Flex>
            {children}
        </Flex>
    );
};

export default CommentContainer;
