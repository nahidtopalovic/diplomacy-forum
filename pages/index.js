import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import {
    Flex,
    Box,
    Container,
    Divider,
    VStack,
    Center,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import ResponseSummary from '../components/response/response-summary';
import ResponseStats from '../components/response/response-stats';
import SortingButtons from '../components/sortingButtons';

import data from '../question.json';

export default function Home() {
    const [responses, setResponses] = useState(null);
    const [sortType, setSortType] = useState('Votes');

    useEffect(() => {
        setTimeout(() => {
            setResponses(data);
        }, [500]);
    }, [data]);

    const handleSorting = () => {
        switch (sortType) {
            case 'Newest':
                return (x, y) => new Date(y.created) - new Date(x.created);
            case 'Oldest':
                return (x, y) => new Date(x.created) - new Date(y.created);
            case 'Votes':
                return (x, y) => y.score - x.score;
            case 'Views':
                return (x, y) => y.views - x.views;
            case 'Least responses':
                return (x, y) => x.answers.length - y.answers.length;
            default:
                break;
        }
    };

    return (
        <Layout>
            <Head>
                <title>DOJO Forum</title>
                <meta name="description" content="Forum" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Center pb={2}>
                <SortingButtons
                    buttons={[
                        'Votes',
                        'Views',
                        'Newest',
                        'Oldest',
                        'Least responses',
                    ]}
                    selected={sortType}
                    setSelected={setSortType}
                />
            </Center>

            {!responses && (
                <Center>
                    <Spinner />{' '}
                </Center>
            )}
            <Container>
                <VStack spacing={2} align="stretch" divider={<Divider />}>
                    {responses
                        ? responses
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
                                          align="start"
                                          justify="flex-start"
                                          bg="gray.200"
                                      >
                                          <Box w="15%">
                                              <ResponseStats
                                                  voteCount={votes.length}
                                                  answerCount={answers.length}
                                                  view={views}
                                              />
                                          </Box>
                                          <Box w="85%">
                                              <ResponseSummary
                                                  id={id}
                                                  title={title}
                                                  tags={tags}
                                                  author={author}
                                                  createdTime={created}
                                              >
                                                  {text}
                                              </ResponseSummary>
                                          </Box>
                                      </Flex>
                                  )
                              )
                        : null}
                </VStack>
            </Container>
        </Layout>
    );
}
