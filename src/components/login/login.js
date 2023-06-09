import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, TextField, Button } from "@mui/material";
import axios from "axios";
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogin = async () => {
    let isAuth = false;

    try {
      const res = await axios.post("https://tv-app-eta.vercel.app/api/login", {
        email,
        password,
      });
      const status = res.status;
      // console.log(status)
      status === 401 ? (isAuth = false) : (isAuth = true);
    } catch (e) {
      console.log(e);
    }
    console.log(isAuth);
    return isAuth;
  };

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!/^[a-zA-Z0-9]{8,16}$/.test(password)) {
      setPasswordError(
        "Password must be 8 to 16 characters long and contain only alphanumeric characters"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    console.log(isValid);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const check = await handleLogin();
      check ? navigate("/search") : navigate("/login");
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <form autoComplete="off" onSubmit={handleSubmit} className="login-main">
        <h2>Login Page</h2>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Login failed. Please check your credentials.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
export default Login;
