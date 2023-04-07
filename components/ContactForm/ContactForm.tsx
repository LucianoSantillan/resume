import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import fetch from 'isomorphic-fetch';
export const CONTACT_SECTION_ID = "contact-section";

interface FormData {
    fullName: string;
    email: string;
    message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        fullName: false,
        email: false,
        message: false,
    });
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateFields = () => {
        const { fullName, email, message } = formData;
        const fullNameError = !fullName;
        const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const messageError = !message;

        setErrors({
            fullName: fullNameError,
            email: emailError,
            message: messageError,
        });

        return !fullNameError && !emailError && !messageError;
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        let error = false;
        if (name === "fullName") {
            error = !value;
        } else if (name === "email") {
            error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (name === "message") {
            error = !value;
        }

        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateFields();
        if (isValid) {
            setLoading(true);
            try {
                const response = await fetch("https://formspree.io/f/xbjezpnk", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    setFormData({
                        fullName: "",
                        email: "",
                        message: "",
                    });
                    setSuccessOpen(true);
                } else {
                    setErrorOpen(true);
                }
            } catch (error) {
                console.error(error);
                setErrorOpen(true);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSuccessClose = () => {
        setSuccessOpen(false);
    };

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    return (
        <Box id={CONTACT_SECTION_ID} sx={{ bgcolor: "#f5f5f5", p: 4, color: "#212529" }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
                <div className={styles.aboutSectionTitle}>CONTACT</div>
                <TextField
                    name="fullName"
                    label="Full Name"
                    variant="outlined"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    onBlur={handleBlur}
                    error={errors.fullName}
                    helperText={errors.fullName && "Please enter your full name."}
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                />
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleFormChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    helperText={errors.email && "Please enter a valid email."}
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                />
                <TextField
                    name="message"
                    label="Message"
                    variant="outlined"
                    value={formData.message}
                    onChange={handleFormChange}
                    onBlur={handleBlur}
                    error={errors.message}
                    helperText={errors.message && "Please enter a message."}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
                {successOpen && (
                    <Snackbar
                        open={successOpen}
                        autoHideDuration={6000}
                        onClose={handleSuccessClose}
                    >
                        <Alert onClose={handleSuccessClose} severity="success">
                            Your message has been sent!
                        </Alert>
                    </Snackbar>
                )}
                {errorOpen && (
                    <Snackbar
                        open={errorOpen}
                        autoHideDuration={6000}
                        onClose={handleErrorClose}
                    >
                        <Alert onClose={handleErrorClose} severity="error">
                            There was an error sending your message. Please try again later.
                        </Alert>
                    </Snackbar>
                )}
            </form>
        </Box>
    );

};

export default ContactForm;
