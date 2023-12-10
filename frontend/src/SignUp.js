import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { registerRoute } from "./utils/APIRoutes";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setErrors(Validation(values)); // Corrected function name from setErros to setErrors
  //   if(errors.username === "" && errors.email === "" && errors.password === ""){
  //     axios.post('http://localhost:8081/signup', values)
  //     .then(res => {
  //       navigate('/')
  //     })
  //     .catch(err => console.log(err))
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log(values);
      const { email, username, password } = values;
      axios
        .post(registerRoute, {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log("Line 64, ", res);
          console.log("Registered Successfully !!");
          toast.success("Signed in Successfully !!", toastOptions);
        })
        .catch((err) => {
          console.log("Line 67", err);
          toast.error(err.response.data.msg, toastOptions);
        });
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    console.log("Received Password:", password);
    console.log("Received ConfirmPassword:", confirmPassword);
    if (!username || username[0].trim() === "") {
      // Check for undefined or empty username
      toast.error("Username cannot be empty.", toastOptions);
      return false;
    } else if (!email || email[0].trim() === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } 
    else if(!password || password[0].trim() === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    else if(!confirmPassword || confirmPassword[0].trim() === "") {
      toast.error("Confirm Password is required.", toastOptions);
      return false;
    }
    else if (password[0] !== confirmPassword[0]) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } 
    else if (username[0].length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password[0].length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (username[0].trim() === "") {
      // Check for empty username
      toast.error("Username cannot be empty.", toastOptions);
      return false;
    } else if (!isValidEmail(email[0])) {
      // Check for valid email format
      toast.error("Invalid email format.", toastOptions);
      return false;
    }

    return true;
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
