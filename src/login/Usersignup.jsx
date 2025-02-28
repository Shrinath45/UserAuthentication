import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Email, Phone, Lock } from "@mui/icons-material";
import { styled } from "@mui/system";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
});

const StyledPaper = styled(Paper)({
  padding: "30px",
  width: "400px",
  textAlign: "center",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
});

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name is too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contact: Yup.string()
      .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setServerError("");
      
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.email === values.email);
      
      if (userExists) {
        setServerError("User already exists with this email.");
        return;
      }
      
      users.push(values);
      localStorage.setItem("users", JSON.stringify(users));
      alert("User Registered Successfully");
      navigate("/login");
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container>
      <StyledPaper elevation={10}>
        <Person style={{ fontSize: 50, color: "#1e3c72", marginBottom: 10 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create Your Account
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Sign up to get started
        </Typography>

        {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

        <form onSubmit={formik.handleSubmit}>
          <TextField fullWidth label="Full Name" variant="outlined" name="name" {...formik.getFieldProps("name")} margin="normal" error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} InputProps={{ startAdornment: (<InputAdornment position="start"><Person /></InputAdornment>) }} />
          
          <TextField fullWidth label="Email" variant="outlined" name="email" {...formik.getFieldProps("email")} margin="normal" error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }} />
          
          <TextField fullWidth label="Contact Number" variant="outlined" name="contact" {...formik.getFieldProps("contact")} margin="normal" error={formik.touched.contact && Boolean(formik.errors.contact)} helperText={formik.touched.contact && formik.errors.contact} InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }} />
          
          <TextField fullWidth label="Password" variant="outlined" type={showPassword ? "text" : "password"} name="password" {...formik.getFieldProps("password")} margin="normal" error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} InputProps={{ startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton onClick={handleTogglePassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />
          
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, py: 1.5, fontWeight: "bold", background: "linear-gradient(135deg, #1e3c72, #2a5298)", "&:hover": { background: "#1e3c72" } }}>SIGN UP</Button>
        </form>

        <Typography variant="body2" mt={2}>Already have an account? <span style={{ color: "#1e3c72", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span></Typography>
      </StyledPaper>
    </Container>
  );
};

export default SignupForm;