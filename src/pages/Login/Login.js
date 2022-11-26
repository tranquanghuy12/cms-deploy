import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import { blue } from "@mui/material/colors";
import swal from "sweetalert";
import { getAllUsers } from "../../app/rootSaga";
import { loginSchema } from "../../services/Schema";
import { useNavigate } from "react-router-dom";
import Users from "../Users/Users";
import { Container } from "@mui/system";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usersList } = useSelector((rootReducer) => rootReducer.getUsersList);

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  // user login information from localStorage
  const userData = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    const userData = usersList.find((user) => user.email === values.email);
    if (userData) {
      if (userData.password !== values.password) {
        swal({
          title: "Incorrect password",
          icon: "error",
        });
      } else {
        localStorage.setItem("User", JSON.stringify(userData));
        swal({
          title: "Logged in successfully",
          icon: "success",
        }).then(() => navigate("/users"));
      }
    } else {
      swal({
        title: "Email does not exist",
        icon: "error",
      });
    }
  };

  return (
    <div>
      {userData === null ? (
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            const { values, error, touched, isSubmitting } = formikProps;

            return (
              <Form onSubmit={formikProps.handleSubmit}>
                <Container component="main" maxWidth="xs">
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Log in
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
                      <Box>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                        />
                        <ErrorMessage name="email">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      </Box>

                      <Box>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                        />
                        <ErrorMessage name="password">
                          {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                        </ErrorMessage>
                      </Box>

                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />

                      <Box sx={{ mr: 2, position: "relative" }}>
                        <Button
                          disabled={isLoading}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Log In
                        </Button>
                        {isLoading && (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: blue[500],
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-12px",
                            }}
                          />
                        )}
                      </Box>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Users />
      )}
    </div>
  );
}
