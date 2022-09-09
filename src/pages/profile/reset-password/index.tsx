import ChevronIcon from '@/assets/icons/Chevronicon';
import { UPDATE_PASSWORD } from '@/client/graphquery/mutation';
import InputErrorMessage from '@/components/General/Form/InputErrorMessage';
import Label from '@/components/General/Form/Label';
import { parseErrorMsg, ResetPasswordSchema } from '@/utils/validation';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ResetPasswordFormikType {
  newPassword: string;
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage: NextPage = () => {
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const router = useRouter();
  const toast = useToast();
  const handleSubmit = async (values: ResetPasswordFormikType) => {
    if (values.newPassword === values.password) {
      return toast({
        position: 'top-right',
        title: `Warning`,
        description: "Password can't be same",
        status: 'warning',
        duration: 1000,
        isClosable: true,
      });
    }

    try {
      await updatePassword({ variables: { data: values } });

      toast({
        position: 'top-right',
        title: `Login Success.`,
        description: `Password Changed`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });

      return router.push('/profile');
    } catch (error) {
      const errMsg = parseErrorMsg(error as Error);
      console.log(errMsg);
      toast({
        position: 'top-right',
        title: errMsg,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      newPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    validateOnChange: true,
  });

  const isFormInvalid = (name: string) => {
    // @ts-ignore: Unreachable code error
    if (formik.errors[name] && formik.touched[name]) return true;
    else false;
  };

  return (
    <>
      <Head>
        <title>Reset Password | ChatsQL</title>
      </Head>

      <Box
        as="section"
        minW="100%"
        px={'1rem'}
        display={'flex'}
        flexDir={'column'}
        alignItems="center"
        justifyContent={'center'}
        position={'relative'}
      >
        <Text
          alignSelf={'start'}
          mb="1rem"
          as={'h1'}
          fontWeight="700"
          display={'flex'}
          gap="0.2rem"
        >
          <Link href={'/profile'} passHref>
            <a>
              <ChevronIcon style={{ height: '24px' }} />
            </a>
          </Link>
          Reset Password
        </Text>
        <form style={{ minWidth: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack minW={'100%'} gap="0.1rem">
            <FormControl isInvalid={isFormInvalid('newPassword')}>
              <Label>New Password</Label>
              <Input
                name="newPassword"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                placeholder="Enter your new password"
                type={'password'}
              />
              <InputErrorMessage name="newPassword" formik={formik} />
            </FormControl>
            <FormControl isInvalid={isFormInvalid('password')}>
              <Label>Current Password</Label>
              <Input
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                type={'password'}
                placeholder="Enter your current password"
              />
              <InputErrorMessage name="password" formik={formik} />
            </FormControl>
            <FormControl isInvalid={isFormInvalid('confirmPassword')}>
              <Label>Confirm Current Password</Label>
              <Input
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                type={'password'}
                placeholder="Retype your current password"
              />
              <InputErrorMessage name="confirmPassword" formik={formik} />
            </FormControl>
            <Button alignSelf={'end'} colorScheme="teal" type="submit">
              Confirm
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default ResetPasswordPage;
