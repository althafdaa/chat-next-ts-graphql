import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import HomeImg from '@/assets/img/HomeImg.svg';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import nookies from 'nookies';

interface HomePageProps {
  token: string | null;
  isLoggedIn: boolean;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { token } = nookies.get(ctx);

  if (!token) {
    return {
      props: { isLoggedIn: false, token: null },
    };
  }

  return {
    props: { isLoggedIn: true, token: token },
    redirect: { permanent: false, destination: '/search' },
  };
}

const Home: NextPage<HomePageProps> = () => {
  return (
    <Box minH="100vh" w={'100%'} py="1rem" display={'flex'} as="main">
      <Head>
        <title>Chat Grahph | Chat Graph</title>
        <meta name="description" content="Created by @althafadaa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        <Box as="section" minW="100%" display={'flex'} alignItems="center">
          <Container
            display="flex"
            flexDir={'column'}
            as={motion.div}
            initial={{ y: -20, opacity: 0.5 }}
            animate={{ y: 1, opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
          >
            <Text fontWeight="700" textAlign={'center'} mb="2rem">
              <Text as={'span'} color="green.50" fontSize={'4xl'}>
                Hi!
              </Text>
              <br />
              <Text as={'span'} color="green.50" fontSize={'2xl'}>
                Lets start our conversation here😉
              </Text>
            </Text>
            <img src={HomeImg.src} alt="Welcome" />
            <Flex
              flexDir={'column'}
              gap="4px"
              mt={'2rem'}
              alignItems={'center'}
            >
              <Link href={'/login'} passHref>
                <a style={{ width: '100%' }}>
                  <Button
                    bgColor="green.600"
                    color={'green.50'}
                    w={'100%'}
                    fontWeight={700}
                  >
                    LOGIN
                  </Button>
                </a>
              </Link>

              <Link href={'/register'} passHref>
                <a style={{ width: '100%' }}>
                  <Button bgColor="transparent" color={'black'} w={'100%'}>
                    REGISTER
                  </Button>
                </a>
              </Link>
            </Flex>
          </Container>
        </Box>
      </AnimatePresence>
    </Box>
  );
};

export default Home;
