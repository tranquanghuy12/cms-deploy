import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Input, Link } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIdBlog, updateUser } from "../../redux/Users/UsersSlice";
import { getUserById } from "../../redux/Users/UsersSlice";
import { Schema } from "../../services/Schema";
import { getAllProjects } from "../../app/rootSaga";
import swal from "sweetalert";
import UpdateUserModal from "./UpdateUserModal";

export default function UserDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { userById } = useSelector((rootReducer) => rootReducer.getUserById);
  console.log(userById);

  const { projectsList } = useSelector(
    (rootReducer) => rootReducer.getProjectsList
  );

  // find all projects in the list of projects that the user is involved in
  const userProjects = projectsList.filter((project) =>
    project.member.find((mem) => mem.userId === userById.userId)
  );

  const { mode } = useSelector((rootReducer) => rootReducer.changeMode);

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  useEffect(() => {
    dispatch(getIdBlog(id));
    dispatch(getAllProjects());
  }, []);

  useEffect(() => {
    dispatch(
      updateUser({
        ...userById,
        projects: userProjects,
      })
    );
  }, [projectsList]);

  const initialValues = {
    firstName: userById.firstName,
    lastName: userById.lastName,
    email: userById.email,
    password: userById.password,
    role: userById.role,
  };

  const handleSubmit = (values) => {
    swal({
      title: "Are you sure?",
      text: "Once updated, you will not be able to restore it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          dispatch(
            updateUser({
              ...userById,
              firstName:
                values.firstName === undefined
                  ? userById.firstName
                  : values.firstName,
              lastName:
                values.lastName === undefined
                  ? userById.lastName
                  : values.lastName,
              email: values.email === undefined ? userById.email : values.email,
              password:
                values.password === undefined
                  ? userById.password
                  : values.password,
            })
          );
          swal({
            title: "Update successfully!",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div
      className={`container rounded ${
        mode === "light" ? "bg-white" : "bg-dark"
      }`}
    >
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { values, error, touched } = formikProps;
          return (
            <Form onSubmit={formikProps.handleSubmit}>
              <div className="row">
                <div className="d-flex justify-content-center align-items-center col-md-3 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      sx={{ width: 150, height: 150, mb: 3 }}
                    />

                    <span className="font-weight-bold">
                      {userById.firstName} {userById.lastName}
                    </span>
                    <span
                      className={`${
                        mode === "light" ? "text-black-50" : "text-white-50"
                      }`}
                    >
                      {userById.email}
                    </span>
                    <span
                      className={`${
                        mode === "light" ? "text-black-50" : "text-white-50"
                      }`}
                    >
                      ID: {userById.userId}
                    </span>
                    <span> </span>
                  </div>
                </div>
                <div className="col-md-5 border-right">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Profile</h4>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="labels">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="first name"
                          name="firstName"
                          value={formikProps.values.firstName}
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="labels">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="last name"
                          name="lastName"
                          size="small"
                          value={formikProps.values.lastName}
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="email"
                          name="email"
                          value={formikProps.values.email}
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <label className="labels">Password</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="password"
                          name="password"
                          value={formikProps.values.password}
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <label className="labels">Role</label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          placeholder="role"
                          name="role"
                          value={formikProps.values.role}
                        />
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        type="submit"
                      >
                        Save Profile
                      </button>
                      {/* <UpdateUserModal userById={userById} /> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center experience">
                      <h4>Projects</h4>
                    </div>
                    <br />
                    <div className="col-md-12">
                      {userProjects?.map((proj, index) => {
                        return (
                          <Box key={index}>
                            <span>• </span>
                            <Link
                              underline="none"
                              href={`/projects/${proj?.id}`}
                            >
                              {proj.name}
                            </Link>
                          </Box>
                        );
                      })}
                    </div>{" "}
                    <br />
                    <div className="col-md-12">
                      <label className="labels">Additional Details</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="additional details"
                        defaultValue
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
