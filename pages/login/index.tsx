import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import { routes } from '@/routes';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: { username: string, password: string }) => {
    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: routes.ADMIN_CREATE_ARTICLES,
      });
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      // const response = await fetch(`${apiUrl}/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   localStorage.setItem('token', data.token);
      //   router.push('/articles/create');
      // } else {
      //   console.error(data.message);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ width: '300px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>Login</Typography>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <Field
                name="username"
                as={TextField}
                label="Username"
                type="text"
                fullWidth
                margin="normal"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <Field
                name="password"
                as={TextField}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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