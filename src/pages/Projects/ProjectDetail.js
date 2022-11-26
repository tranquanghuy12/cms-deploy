import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography, Container, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, useFormik, Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import IconButton from "@mui/material/IconButton";
import {
  getProjectId,
  updateProject,
} from "../../redux/Projects/ProjectsSlice";
import {
  getAllProjects,
  getAllUsers,
  getLoadingOnRefresh,
} from "../../app/rootSaga";
import swal from "sweetalert";
import { selectTranslationsProjectDetail } from "../../redux/ChangeLanguage/ChangeLanguageSlice";

//remove in array 1 the elements that are the same as the elements in array 2
function removeDup(arr1, arr2) {
  arr1 = arr1?.filter(
    (item) => !arr2?.find((item2) => item2.userId === item.userId)
  );
  return arr1;
}

export default function BasicTextFields() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [usersAddToProject, setUsersAddToProject] = useState([]);

  const { projectById } = useSelector(
    (rootReducer) => rootReducer.getProjectById
  );

  const translationsProjectDetail = useSelector(
    selectTranslationsProjectDetail
  );

  const { usersList } = useSelector((rootReducer) => rootReducer.getUsersList);

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getProjectId(id));
    dispatch(getLoadingOnRefresh());
  }, [id]);

  const initialValues = {
    name: projectById.name,
    description: projectById.description,
  };

  const handleSubmit = (values) => {
    swal({
      title: `${translationsProjectDetail.warningUpdate.title}`,
      text: `${translationsProjectDetail.warningUpdate.text}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await dispatch(
            updateProject({
              ...projectById,
              name: values.name === undefined ? projectById.name : values.name,
              member: projectById?.member.concat(usersAddToProject),
              description:
                values.description === undefined
                  ? projectById.description
                  : values.description,
            })
          );
          setUsersAddToProject([]);
          dispatch(getAllProjects());
          swal({
            title: `${translationsProjectDetail.notify.update}`,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleChange = (event, values) => {
    setUsersAddToProject(values);
  };

  const handleClick = (user) => {
    navigate(`/userdetail/${user.id}`);
  };

  const delUsersInProject = (e, value) => {
    swal({
      title: `${translationsProjectDetail.warningDelete.title}`,
      text: `${translationsProjectDetail.warningDelete.text}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          updateProject({
            ...projectById,
            member: projectById?.member.filter(
              (mem) => mem.userId !== value.userId
            ),
          })
        );
        swal({
          title: `${translationsProjectDetail.notify.delete}`,
          icon: "success",
        });
      }
    });
  };

  const delUsersAddToProject = (e, value) => {
    setUsersAddToProject(
      usersAddToProject.filter((mem) => mem.userId !== value.userId)
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <Container component="main" maxWidth="lg" sx={{ marginTop: 6 }}>
              <Typography variant="h4" sx={{ mb: 6, textAlign: "center" }}>
                {translationsProjectDetail.title} "{projectById.name}"
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Grid item xs={12} sx={{ mb: 4 }}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      required
                      fullWidth
                      id="name"
                      label={translationsProjectDetail.projectName}
                      name="name"
                      autoComplete="name"
                      value={formikProps.values.name}
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      required
                      fullWidth
                      name="description"
                      label={translationsProjectDetail.description}
                      id="description"
                      autoComplete="description"
                      multiline
                      rows={4}
                      value={formikProps.values.description}
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  {/* users in project */}
                  <Stack
                    direction="row"
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {projectById.member?.map((user, index) => {
                      return (
                        <Chip
                          key={index}
                          color="primary"
                          label={user.firstName + ", " + user.lastName}
                          onClick={() => handleClick(user)}
                          onDelete={(e) => delUsersInProject(e, user)}
                          sx={{ m: 1, ml: 0 }}
                        />
                      );
                    })}
                    {/* user want to add to project */}
                    {usersAddToProject !== []
                      ? usersAddToProject.map((user, index) => {
                          return (
                            <Chip
                              key={index}
                              label={user.firstName + ", " + user.lastName}
                              onClick={handleClick}
                              onDelete={(e) => delUsersAddToProject(e, user)}
                              sx={{ m: 1, ml: 0 }}
                            />
                          );
                        })
                      : null}
                    {/* add user button */}
                    <Box>
                      <Tooltip
                        title={translationsProjectDetail.addMember}
                        arrow
                      >
                        <IconButton
                          variant="contained"
                          color="primary"
                          onClick={handleClickOpen}
                        >
                          <PersonAddAlt1Icon />
                        </IconButton>
                      </Tooltip>

                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add member</DialogTitle>
                        <DialogContent>
                          <Stack spacing={3} sx={{ width: 500 }}>
                            <Autocomplete
                              multiple
                              id="tags-outlined"
                              options={removeDup(usersList, projectById.member)}
                              getOptionLabel={(option) =>
                                option.firstName + " " + option.lastName
                              }
                              value={usersAddToProject}
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose who you want to add"
                                  placeholder="User name"
                                  variant="standard"
                                />
                              )}
                              onChange={handleChange}
                            />
                          </Stack>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleClose}>Subscribe</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              <Box sx={{ position: "relative", mt: 8 }}>
                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  {translationsProjectDetail.update}
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
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
}
