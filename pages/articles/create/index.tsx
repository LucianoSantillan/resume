import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Create.module.css';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import { routes } from '@/routes';

const CreatePage: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/articles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          setAlert({ severity: 'success', message: 'Article created successfully' });
          resetForm();
        } else {
          setAlert({ severity: 'error', message: 'An unexpected error has occurred' });
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        setAlert({ severity: 'error', message: 'An unexpected error has occurred' });
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <div className={styles.root}>
      <Navbar />
      {alert && (
        <SnackbarAlert
          open={true}
          onClose={handleCloseAlert}
          severity={alert.severity}
          message={alert.message}
        />
      )}
      <Typography className={styles.title} variant="h4" gutterBottom>
        Create Article
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
          fullWidth
          margin="normal"
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting  || !formik.isValid}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export async function getServerSideProps(
  // context
  ) {
  // const { auth } = parseCookies(context)

  // If no auth cookie is found, redirect the user to the login page
  // if (!auth) {
  if (!false) {
    return {
      redirect: {
        destination: routes.LOGIN,
        permanent: false,
      },
    }
  }

  // If auth cookie is found, continue to render the page
  return {
    props: {}, // add your own props as necessary
  }
}

export default CreatePage;