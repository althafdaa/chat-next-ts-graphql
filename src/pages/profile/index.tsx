import { LOGOUT } from '@/client/graphquery/mutation';
import { useMutation } from '@apollo/client';
import { Button, useToast } from '@chakra-ui/react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { token } = nookies.get(ctx);

  if (!token) {
    return {
      props: { isLoggedIn: false, token: null },
      redirect: { permanent: false, destination: '/' },
    };
  }

  return {
    props: { isLoggedIn: true, token: token },
  };
}

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [logout] = useMutation(LOGOUT);
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();

      toast({
        position: 'top-right',
        title: `Logged out.`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      return router.push('/');
    } catch (error) {
      console.log(error);
      toast({
        position: 'top-right',
        title: `Something went wrong`,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Profile | Chat App</title>
      </Head>

      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default ProfilePage;
