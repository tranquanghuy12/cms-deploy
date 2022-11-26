import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  ButtonGroup,
  InputLabel,
  Select,
  TextField,
  Grid,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateUserModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userById } = props;

  const initialValues = {
    firstName: userById.firstName,
    lastName: userById.lastName,
    email: userById.email,
    password: userById.password,
    role: userById.role,
  };
  console.log(initialValues);

  const handleSubmit = () => {};

  return (
    <div>
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      >
        {(formikProps) => {
          console.log(formikProps);
          return (
            <Form onSubmit={formikProps.handleSubmit}>
              <Button onClick={handleOpen}>Update</Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Update information
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={formikProps.values.firstName}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                      </Grid>

                      <Box sx={{ mr: 2, position: "relative" }}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign Up
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              </Modal>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
