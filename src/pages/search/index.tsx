import InputErrorMessage from '@/components/General/Form/InputErrorMessage';
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FormikHelpers, useFormik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import SearchIcon from '@/assets/icons/SearchIcon';
import { useMutation } from '@apollo/client';
import { FOLLOW, GET_USER, UNFOLLOW } from '@/client/graphquery/mutation';
import { parseErrorMsg } from '@/utils/validation';
import ConditionalRender from '@/components/General/ConditionalRender';
import { useState } from 'react';
import PhotoPlaceholder from '@/assets/img/PhotoPlaceholder.png';

interface SearchFormikType {
  userName: string;
}
interface UserByUsernameType {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  followed: boolean;
  followings: [];
}

const SearchPage: NextPage = () => {
  const [getUser, { data }] = useMutation<{
    UserByUsername: UserByUsernameType;
  }>(GET_USER);
  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);
  const [showInput, setShowInput] = useState<boolean>(true);
  const toast = useToast();
  const [onHover, setOnHover] = useState<boolean>(false);

  const { UserByUsername } = data || {};

  const handleSubmit = async (
    values: SearchFormikType,
    action: FormikHelpers<any>
  ) => {
    try {
      await getUser({ variables: { data: { userName: values.userName } } });
      setShowInput(false);
    } catch (error) {
      const err = parseErrorMsg(error as Error);
      toast({
        status: 'error',
        title: err,
        position: 'top-left',
        isClosable: true,
      });
    } finally {
      action.resetForm();
    }
  };
  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { userName: '' },
  });

  return (
    <Box
      minH="100vh"
      w={'100%'}
      py="1rem"
      display={'flex'}
      as="main"
      alignItems={'center'}
    >
      <Head>
        <title>Chats | Chat Graph</title>
      </Head>

      <Box
        as="section"
        minW="100%"
        display={'flex'}
        flexDir={'column'}
        alignItems="center"
        justifyContent={'center'}
        position={'relative'}
      >
        <ConditionalRender when={showInput}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl position={'relative'}>
              <Input
                minW={'360px'}
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                placeholder="Find a user"
              />
              <InputErrorMessage name="userName" formik={formik} />

              <Box
                as="button"
                type="submit"
                position={'absolute'}
                right="10px"
                top={'20%'}
              >
                <SearchIcon fill="gray" style={{ height: '24px' }} />
              </Box>
            </FormControl>
          </form>
        </ConditionalRender>

        <ConditionalRender when={!showInput}>
          <Box
            display={'flex'}
            flexDir="column"
            alignItems={'center'}
            gap="0.4rem"
          >
            <Image
              rounded={'full'}
              h="80px"
              src={PhotoPlaceholder.src}
              alt="user photo"
            />
            <Text fontSize={'xl'} as="span">
              {UserByUsername?.userName}
            </Text>

            <ConditionalRender when={!UserByUsername?.followed}>
              <Button
                mb={'1rem'}
                colorScheme="whatsapp"
                onClick={async () => {
                  await follow({
                    variables: { data: { followingId: UserByUsername?.id } },
                  });
                  await getUser({
                    variables: { data: { userName: UserByUsername?.userName } },
                  });
                }}
              >
                Follow
              </Button>
            </ConditionalRender>

            <ConditionalRender when={UserByUsername?.followed as boolean}>
              <Button
                mb={'1rem'}
                colorScheme="pink"
                onClick={async () => {
                  await unfollow({
                    variables: { data: { followingId: UserByUsername?.id } },
                  });
                  await getUser({
                    variables: { data: { userName: UserByUsername?.userName } },
                  });
                }}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
              >
                {onHover ? 'Unfollow' : 'Followed'}
              </Button>
            </ConditionalRender>
          </Box>
          <Button
            fontSize={'sm'}
            colorScheme="facebook"
            onClick={() => setShowInput(true)}
          >
            Search again
          </Button>
        </ConditionalRender>
      </Box>
    </Box>
  );
};

export default SearchPage;
