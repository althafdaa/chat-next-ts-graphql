import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
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

export const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password minimum 8 characters')
    .required('Password is required'),
});

export const parseErrorMsg = (error: object) => {
  const err = error as Error;
  const errMsg = err.message || 'Something went wrong';

  return errMsg as string;
};
