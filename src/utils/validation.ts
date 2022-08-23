import * as y from 'yup';

export const RegisterSchema = y.object().shape({
  email: y.string().email().required('Email is required'),
  userName: y.string().required('Username is required'),
  firstName: y.string().required('First name is required'),
  lastName: y.string().required('Last name is required'),
  password: y
    .string()
    .min(8, 'Password minimum 8 characters')
    .required('Password is required'),
  confirmPassword: y
    .string()
    .required('Please retype your password.')
    .oneOf([y.ref('password')], 'Your passwords do not match.'),
});

export const LoginSchema = y.object().shape({
  userName: y.string().required('Username is required'),
  password: y
    .string()
    .min(8, 'Password minimum 8 characters')
    .required('Password is required'),
});

export const UpdateProfileSchema = y.object().shape({
  userName: y.string().required('Username is required'),
});

export const parseErrorMsg = (error: object) => {
  const err = error as Error;
  const errMsg = err.message || 'Something went wrong';

  return errMsg as string;
};
