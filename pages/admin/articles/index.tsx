import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Create.module.css';
import { useSession } from 'next-auth/react';
import { useToast } from '@/contexts/toastProvider';

const CreatePage: FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {data:session} = useSession()
  const {openToast, openUnexpectedErrorToast} = useToast()

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
            'Authorization': `Bearer ${session?.user?.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          openToast({ severity: 'success', message: 'Article created successfully' });
          resetForm();
        } else {
          openUnexpectedErrorToast()
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        openUnexpectedErrorToast()
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },


  });

  return (
    <div className={styles.root}>
      <Navbar />
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

export default CreatePage;