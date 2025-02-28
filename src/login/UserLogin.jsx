import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { styled } from "@mui/system";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
});

const StyledPaper = styled(Paper)({
  padding: "30px",
  width: "350px",
  textAlign: "center",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
});

const UserLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (user) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === user.email);

    if (existingUser && existingUser.password === user.password) {
      localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
      alert("Login successful");
      navigate("/index");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container>
      <StyledPaper elevation={10}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Please login to continue
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              "&:hover": { background: "#1e3c72" },
            }}
          >
            LOGIN
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Don't have an account? {" "}
          <span
            style={{ color: "#1e3c72", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/")}
          >
            Sign Up
          </span>
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default UserLogin;
