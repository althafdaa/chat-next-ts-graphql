import RegisterIcon from '@/assets/icons/RegisterIcon';
import BackButton from '@/components/BackButton';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as Yup from 'yup';

interface FormikValuesType {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: NextPage = () => {
  const handleSubmit = async (values: FormikValuesType) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string()
      .min(8, 'Password minimum 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Please retype your password.')
      .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleSubmit,
    validationSchema: RegisterSchema,
  });

  return (
    <>
      <Head>
        <title>Register | Chat Graph</title>
      </Head>

      <Box
        as="main"
        minH={'100vh'}
        minW="100%"
        bgColor="green.300"
        display={'flex'}
        flexDir={'column'}
        alignItems="center"
        justifyContent={'center'}
        position={'relative'}
      >
        <Box position={'absolute'} top={'12px'} left={'8px'}>
          <BackButton backTo="/" text="Back" />
        </Box>

        <AnimatePresence>
          <Container display="flex" flexDir={'column'}>
            <Box mb={'1rem'} display="flex" flexDir={'column'} gap="0.5rem">
              <Heading color={'gray.700'}>
                One more step to connect with others
              </Heading>
              <Text fontSize={'xs'} color="gray.20" as={'span'}>
                Get yourself into the latest tech of chat-app built with Next,
                Typescript, and GraphQL
              </Text>
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <VStack
                as={motion.div}
                initial={{ opacity: 0.8 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                bgColor={'white'}
                p="1rem"
                rounded={'lg'}
                boxShadow="md"
              >
                <VStack minW={'100%'}>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      name="userName"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      placeholder="Enter your username"
                    ></Input>
                    {formik.errors.userName && formik.touched.userName && (
                      <Text
                        fontSize="xs"
                        color="red"
                        as={motion.span}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {formik.errors.userName}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      placeholder="Enter your first name"
                    ></Input>
                    {formik.errors.firstName && formik.touched.firstName && (
                      <Text
                        fontSize="xs"
                        color="red"
                        as={motion.span}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {formik.errors.firstName}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      placeholder="Enter your last name"
                    ></Input>
                    {formik.errors.lastName && formik.touched.lastName && (
                      <Text
                        fontSize="xs"
                        color="red"
                        as={motion.span}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {formik.errors.lastName}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Enter your password"
                      type={'password'}
                    ></Input>
                    {formik.errors.password && formik.touched.password && (
                      <Text
                        fontSize="xs"
                        color="red"
                        as={motion.span}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {formik.errors.password}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl>
                    <FormLabel>Retype Password</FormLabel>
                    <Input
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      placeholder="Retype your password"
                      type={'password'}
                    ></Input>

                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <Text
                          fontSize="xs"
                          color="red"
                          as={motion.span}
                          initial={{ opacity: 0.5, y: -5 }}
                          animate={{ opacity: 1, y: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {formik.errors.confirmPassword}
                        </Text>
                      )}
                  </FormControl>
                </VStack>
                <Button
                  isLoading={formik.isSubmitting}
                  type="submit"
                  minW="100%"
                  mt={'2rem'}
                >
                  <Box display={'flex'} alignItems="center" gap={'0.2rem'}>
                    <RegisterIcon style={{ width: '24px' }} />
                    Register
                  </Box>
                </Button>

                <Text fontSize={'xs'} as={'span'}>
                  Haven&apos;t registered yet ?{' '}
                  <Link href={'/register'}>
                    <Text as={'span'} color="green.600" fontWeight={700}>
                      Join Us
                    </Text>
                  </Link>
                </Text>
              </VStack>
            </form>
          </Container>
        </AnimatePresence>
      </Box>
    </>
  );
};

export default RegisterPage;
