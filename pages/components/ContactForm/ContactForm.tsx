import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./ContactForm.module.css";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

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
        try {
            const response = await fetch("https://formspree.io/f/xbjezpnk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Your message has been sent!");
                setFormData({
                    fullName: "",
                    email: "",
                    message: "",
                });
            } else {
                alert("There was an error sending your message. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            alert("There was an error sending your message. Please try again later.");
        }
    }
}; 

  return (
    <Box id="contact-section" sx={{ bgcolor: "#f5f5f5", p: 4, color: "#212529" }}>
      <form onSubmit={handleSubmit} style={{maxWidth: '700px', margin: 'auto'}}>
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
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
