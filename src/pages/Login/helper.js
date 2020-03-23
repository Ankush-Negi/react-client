import * as yup from 'yup';

const LoginValidationSchema = yup.object().shape({
  Email: yup
    .string()
    .required('Email Address is a required field')
    .matches('^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$', { message: 'Email address must be a valid email' }),
  Password: yup
    .string()
    .required('Password is required'),
});

export default LoginValidationSchema;
