import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import { postUsersList, getUsersList } from "../../redux/Users/UsersSlice";
import { useDispatch, useSelector } from "react-redux/";
import { Schema } from "../../services/Schema";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllUsers, getLoadingOnRefresh } from "../../app/rootSaga";
import swal from "sweetalert";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { usersList } = useSelector((rootReducer) => rootReducer.getUsersList);

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  //user login account
  const userData = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getLoadingOnRefresh());
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  };

  const handleSubmit = async (values) => {
    // console.log("values", values);

    //find user in usersList has the same email as the email entered in the form
    const userData = usersList.find((user) => user.email === values.email);

    if (userData) {
      swal({
        title: "Email already exists",
        icon: "error",
      });
    } else {
      try {
        await dispatch(postUsersList(values));
        navigate("/users");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { values, error, touched } = formikProps;
          return (
            <Form onSubmit={formikProps.handleSubmit}>
              {userData?.role === "Admin" ? (
                <Container component="main" maxWidth="sm">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <PersonAddAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Add user
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            onBlur={formikProps.handleBlur}
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="firstName">
                            {(msg) => (
                              <span style={{ color: "red" }}>{msg}</span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            onBlur={formikProps.handleBlur}
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="lastName">
                            {(msg) => (
                              <span style={{ color: "red" }}>{msg}</span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
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
                            {(msg) => (
                              <span style={{ color: "red" }}>{msg}</span>
                            )}
                          </ErrorMessage>
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
                            onBlur={formikProps.handleBlur}
                            onChange={formikProps.handleChange}
                          />
                          <ErrorMessage name="password">
                            {(msg) => (
                              <span style={{ color: "red" }}>{msg}</span>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Role
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="role"
                              value={values.role}
                              name="role"
                              label="Role"
                              onChange={formikProps.handleChange}
                            >
                              <MenuItem value="Admin">Admin</MenuItem>
                              <MenuItem value="Member">Member</MenuItem>
                            </Select>
                            <ErrorMessage name="role">
                              {(msg) => (
                                <span style={{ color: "red" }}>{msg}</span>
                              )}
                            </ErrorMessage>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Box sx={{ position: "relative" }}>
                        <Button
                          disabled={isLoading}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Comfirm
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
                    </Box>
                  </Box>
                </Container>
              ) : userData?.role === "Member" ? (
                <Box>Only admins are allowed to use this site</Box>
              ) : (
                <Box>
                  Please <Link to="/login">login</Link> to use this site
                </Box>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
