import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { FetchContext } from '../../context/FetchContext';

const CommentInput = ({ postId, setPost }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { authAxios } = useContext(FetchContext);

    const onSubmit = async (inputData) => {
        try {
            const commentObject = {
                postId: postId,
                text: inputData.comment,
            };

            const link = '/posts/comment';
            const { data } = await authAxios.post(link, commentObject);
            console.log('data from post', data);
            setPost(data);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="comment" isInvalid={errors.comment}>
                    <FormLabel>Your Comment</FormLabel>
                    <Input
                        type="text"
                        lineHeight="5"
                        {...register('comment', {
                            required: true,
                            maxLength: 100,
                        })}
                    />
                    <FormErrorMessage>
                        {errors.comment
                            ? errors.comment.type === 'maxLength'
                                ? 'Maximum size of the comment is 100 characters'
                                : 'This field is required'
                            : null}
                    </FormErrorMessage>
                </FormControl>

                <Button mt={4} colorScheme="gray" type="submit" size="md">
                    Submit
                </Button>
            </form>
            {isSubmitted && (
                <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="150px"
                    mt={2}
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        Comment submitted!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        Thank you for submitting your comment.
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
};

export default CommentInput;
