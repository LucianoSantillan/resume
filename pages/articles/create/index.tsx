import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Create.module.css';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const CreatePage: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
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
          setOpenSuccessAlert(true)
        } else {
          setOpen(true);
          console.error(`HTTP error: ${response.status}`);
        }
      } catch (error) {
        setOpen(true);
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseSuccessAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessAlert(false);
  };

  return (
    <div className={styles.root}>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          An unexpected error has ocurred
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={handleCloseSuccessAlert}>
        <Alert onClose={handleCloseSuccessAlert} severity="success" sx={{ width: '100%' }}>
        'Article created successfully'
        </Alert>
      </Snackbar>
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
          type="submit"
          variant="contained"
          //Todo: Show a loading for submiting
          disabled={isSubmitting || !formik.isValid}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default CreatePage;