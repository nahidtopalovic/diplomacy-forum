import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Heading,
    Center,
    Flex,
    Divider,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import Layout from '../../components/layout';
import PostDetailedSummary from '../../components/detailedPost/PostDetailedSummary';
import PostVote from '../../components/detailedPost/PostVote';
import CommentContainer from '../../components/detailedPost/CommentContainer';
import Head from 'next/head';
import CommentInput from '../../components/post/CommentInput';
import { useAuth } from '../../context/AuthUserContext';

const PostDetail = ({ postId, title }) => {
    const [post, setPost] = useState(null);
    const [commentSortType, setCommentSortType] = useState('Votes');
    const { authUser } = useAuth();

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await axios.get(`/api/posts/${postId}`);
            setPost(postData.data);
        };

        fetchPost();
    }, []);

    const handleSorting = () => {
        switch (commentSortType) {
            case 'Votes':
                return (x, y) => y.score - x.score;
            case 'Newest':
                return (x, y) => new Date(y.created) - new Date(x.created);
            case 'Oldest':
                return (x, y) => new Date(x.created) - new Date(y.created);
            default:
                break;
        }
    };

    // const handleDeleteComment = () => {
    //     // logic for deletion of comment
    // };

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <Container maxW="3xl">
                <Box>
                    <Center mb={2}>
                        <Heading size="lg">{title}</Heading>
                    </Center>

                    <Divider />

                    {!post && (
                        <Center>
                            <Spinner />
                        </Center>
                    )}

                    {post && (
                        <>
                            <Flex mb={4} align="center">
                                <PostVote
                                    score={post.score}
                                    votes={post.votes}
                                    postId={post.id}
                                    setPost={setPost}
                                />
                                <PostDetailedSummary
                                    tags={post.tags}
                                    author={post.author}
                                    created={post.created}
                                    createdTime={post.created}
                                    isAuthor={post.author.id === authUser.id}
                                    typeOfPost="post"
                                >
                                    {post.text}
                                </PostDetailedSummary>
                            </Flex>
                            <Divider mb={4} />
                            {authUser && (
                                <>
                                    <CommentInput
                                        postId={post.id}
                                        setPost={setPost}
                                    />
                                    <Divider my={2} />
                                </>
                            )}

                            {post.answers.length > 0 && (
                                <CommentContainer
                                    commentCount={post.answers.length}
                                    commentSortType={commentSortType}
                                    setCommentSortType={setCommentSortType}
                                >
                                    {post.answers
                                        .sort(handleSorting())
                                        .map((comment) => (
                                            <Flex
                                                key={comment.id}
                                                direction="column"
                                            >
                                                <Flex>
                                                    <PostVote
                                                        score={comment.score}
                                                        votes={comment.votes}
                                                        commentId={comment.id}
                                                        setPost={setPost}
                                                    />
                                                    <PostDetailedSummary
                                                        author={comment.author}
                                                        created={
                                                            comment.created
                                                        }
                                                        createdTime={
                                                            comment.created
                                                        }
                                                        isAuthor={
                                                            comment.author
                                                                .id ===
                                                            authUser.id
                                                        }
                                                        typeOfPost="comment"
                                                    >
                                                        {comment.text}
                                                    </PostDetailedSummary>
                                                </Flex>

                                                <Divider my={2} />
                                            </Flex>
                                        ))}
                                </CommentContainer>
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const postId = slug.split('-').shift();

    const title = slug
        ?.substr(slug.indexOf('-') + 1)
        .split('-')
        .join(' ');

    return {
        props: {
            postId,
            title,
        },
    };
}

export default PostDetail;
