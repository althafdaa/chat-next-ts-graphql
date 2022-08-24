import { FormErrorMessage } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

interface InputErrorMessageProps {
  name: string;
  formik: any;
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ name, formik }) => {
  const formValidationErrorProps = {
    fontSize: 'xs',
    color: 'red',
    as: motion.span,
    initial: { opacity: 0.5, y: -5 },
    animate: { opacity: 1, y: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {formik.errors[name] && formik.touched[name] && (
        <FormErrorMessage {...formValidationErrorProps}>
          {formik.errors[name]}
        </FormErrorMessage>
      )}
    </>
  );
};

export default InputErrorMessage;
