import { gql, useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const LOGOUT = gql`
  mutation Mutation {
    logout {
      id
      userName
      message
    }
  }
`;

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [logout] = useMutation(LOGOUT);
  return (
    <>
      <Head>
        <title>Profile | Chat App</title>
      </Head>

      <main>indexProfilePage</main>
      <Button
        onClick={async () => {
          try {
            const data = await logout();

            console.log(data);

            return router.push('/');
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default ProfilePage;
