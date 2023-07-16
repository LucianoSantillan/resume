import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { signIn, useSession } from 'next-auth/react';
import { routes } from '@/routes';
import { CONNECTION_ERROR_MESSAGE } from '../api/auth/[...nextauth]';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { data: session } = useSession()
  const router = useRouter();
  const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

  if(session?.user) router.push(routes.ADMIN_CREATE_ARTICLES)

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values: { username: string, password: string }) => {
    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        // callbackUrl: routes.ADMIN_CREATE_ARTICLES,
      });
      if (result?.error === CONNECTION_ERROR_MESSAGE) {
        setAlert({ severity: "error", message: 'Unexpected error'})
      }
    } catch (error) {

    };
  }

  const handleCloseUnexpectedError = () => {
    setAlert(null)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: "#F9F9F9" }}>
      <Box sx={{ width: '300px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2, color: '#212529' }}>Login</Typography>
        {alert && (
          <SnackbarAlert
            open={!!alert}
            onClose={handleCloseUnexpectedError}
            severity={alert.severity}
            message={alert.message} />
        )}
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