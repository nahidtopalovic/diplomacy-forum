import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/layout';
import {
    Flex,
    Box,
    Container,
    Divider,
    VStack,
    Center,
    Heading,
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';
import PostSummary from '../components/post/PostSummary';
import PostStats from '../components/post/PostStats';
import SortingButtons from '../components/SortingButtons';
import Select from 'react-select';

const Home = () => {
    const router = useRouter();
    const [posts, setPosts] = useState(null);
    const [sortType, setSortType] = useState('Newest');
    const [lastKey, setLastKey] = useState('');
    const [nextPostsLoading, setNextPostsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const link = router.query.tag
                ? `api/data?tag=${router.query.tag}`
                : `api/data`;
            const response = await axios.get(link);
            setPosts(response.data.posts);

            setLastKey(response.data.lastKey);
        };

        fetchData();
    }, [router.query.tag]);

    useEffect(() => {
        const fetchTags = async () => {
            const link = 'api/tags';
            const response = await axios.get(link);
            setOptions(response.data.tags);
        };

        fetchTags();
    }, []);

    const fetchMorePosts = (key) => {
        if (key.length > 0) {
            setNextPostsLoading(true);
            const fetchData = async () => {
                try {
                    const link = router.query.tag
                        ? `api/data?tag=${router.query.tag}?key=${lastKey}`
                        : `api/data?key=${lastKey}`;
                    const response = await axios.get(link);

                    setLastKey(response.data.lastKey);
                    setPosts(posts.concat(response.data.posts));
                    setNextPostsLoading(false);
                } catch (err) {
                    console.log(err);
                    setNextPostsLoading(false);
                }
            };

            fetchData();
        }
    };

    const handleSorting = () => {
        switch (sortType) {
            case 'Newest':
                return (x, y) => new Date(y.created) - new Date(x.created);
            case 'Oldest':
                return (x, y) => new Date(x.created) - new Date(y.created);
            case 'Votes':
                return (x, y) => y.score - x.score;
            case 'Least responses':
                return (x, y) => x.answers.length - y.answers.length;
            default:
                break;
        }
    };

    const handleChangeSelect = (inputValue) => {
        if (inputValue) {
            router.push(`/?tag=${inputValue.value}`);
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            // border: state.isFocused ? '1px solid #00a0dc' : provided.border,
            textAlign: 'center',
        }),
        option: (provided, { isDisabled, isSelected, isFocused }) => ({
            ...provided,
            backgroundColor: isDisabled
                ? null
                : isSelected
                ? '#00a0dc'
                : isFocused
                ? '#00a0dc'
                : null,
        }),
    };

    return (
        <Layout>
            <Head>
                <title>DOJO Forum</title>
                <meta name="description" content="Forum" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Center
                align="center"
                flexDirection={['column-reverse', 'row']}
                mt={[2, 0]}
            >
                <Heading my={2} as="h2" size="md">
                    {router.query.tag
                        ? `Responses tagged [${router.query.tag}]`
                        : 'All Responses'}
                </Heading>
                <Box ml={5} w={['50%', '20%']} mb={[2, 0]}>
                    <Select
                        options={options}
                        placeholder="Search by tag"
                        onChange={handleChangeSelect}
                        isClearable
                        styles={customStyles}
                        components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                        }}
                    />
                </Box>
            </Center>

            <Center mb={2} mt={1}>
                <SortingButtons
                    buttons={['Votes', 'Newest', 'Oldest', 'Least responses']}
                    selected={sortType}
                    setSelected={setSortType}
                />
            </Center>
            <Center>
                <Divider mb={2} w="60%" />
            </Center>

            {!posts && (
                <Center>
                    <Spinner />{' '}
                </Center>
            )}
            <Container maxW="2xl">
                <VStack spacing={2} align="stretch" divider={<Divider />}>
                    {posts
                        ? posts
                              .sort(handleSorting())
                              .map(
                                  ({
                                      id,
                                      votes,
                                      answers,
                                      views,
                                      title,
                                      text,
                                      tags,
                                      author,
                                      created,
                                  }) => (
                                      <Flex
                                          key={id}
                                          direction="row"
                                          borderRadius="md"
                                      >
                                          <Box w="15%">
                                              <PostStats
                                                  voteCount={votes.length}
                                                  answerCount={answers.length}
                                                  view={views}
                                              />
                                          </Box>
                                          <Box w="85%" m={1}>
                                              <PostSummary
                                                  id={id}
                                                  title={title}
                                                  tags={tags}
                                                  author={author}
                                                  createdTime={created}
                                              >
                                                  {text}
                                              </PostSummary>
                                          </Box>
                                      </Flex>
                                  )
                              )
                        : null}
                    <Center>
                        {nextPostsLoading ? (
                            <Spinner />
                        ) : lastKey.length > 0 ? (
                            <Button onClick={() => fetchMorePosts(lastKey)}>
                                More Posts
                            </Button>
                        ) : (
                            <span>You are up to date!</span>
                        )}
                    </Center>
                </VStack>
            </Container>
        </Layout>
    );
};

export default Home;
