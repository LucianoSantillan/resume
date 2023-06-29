import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: { email: string, password: string }) => {
    // TODO: Implement login logic
    router.push('/');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ width: '300px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>Login</Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <Field
                name="email"
                as={TextField}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={<ErrorMessage name="email" />}
              />
              <Field
                name="password"
                as={TextField}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                error={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleTogglePassword} edge="end">
                      <Visibility />
                    </IconButton>
                  ),
                }}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>Login</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;