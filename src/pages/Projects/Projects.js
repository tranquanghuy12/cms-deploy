import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../app/rootSaga";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { moveProjectToTrash } from "../../redux/Projects/ProjectsSlice";
import { blue } from "@mui/material/colors";
import swal from "sweetalert";
import { selectTranslationsProjectsList } from "../../redux/ChangeLanguage/ChangeLanguageSlice";

export default function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projectsId, setProjectId] = useState([]);

  const { projectsList } = useSelector(
    (rootReducer) => rootReducer.getProjectsList
  );

  const translationsProjectsList = useSelector(selectTranslationsProjectsList);

  //User login account
  const userData = JSON.parse(localStorage.getItem("User"));

  //projects in which the user is involved
  const userProjects = projectsList.filter((proj) =>
    proj.member.find((mem) => mem.userId === userData?.userId)
  );

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const handleMoveProjectsToTrash = () => {
    swal({
      title: `${translationsProjectsList.warningDelete.title}`,
      text: `${translationsProjectsList.warningDelete.text}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await dispatch(moveProjectToTrash(projectsId));
          setProjectId([]);
          swal({
            title: `${translationsProjectsList.notify.delete}`,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Box>
      {userData ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h5">
              {translationsProjectsList.title}
            </Typography>
            <Stack
              sx={{ position: "fixed", right: "2%", bottom: "5%" }}
              direction="row"
              spacing={1}
            >
              <Tooltip title={translationsProjectsList.add} arrow>
                <IconButton
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/addproject")}
                >
                  <Fab
                    disabled={isLoading}
                    size="medium"
                    color="primary"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </IconButton>
              </Tooltip>
              <Box sx={{ m: 1, position: "relative" }}>
                {projectsId.length !== 0 ? (
                  <Tooltip title={translationsProjectsList.delete} arrow>
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={handleMoveProjectsToTrash}
                    >
                      <Fab size="medium" color="error" aria-label="add">
                        <DeleteIcon />
                      </Fab>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton
                    disabled={true}
                    variant="contained"
                    color="primary"
                  >
                    <Fab
                      disabled={true}
                      size="medium"
                      color="primary"
                      aria-label="add"
                    >
                      <DeleteIcon />
                    </Fab>
                  </IconButton>
                )}
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
            </Stack>
          </Box>

          {userData.role === "Admin" ? (
            <Box
              sx={{
                minWidth: 275,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {projectsList.map((project, index) => {
                return (
                  <Card
                    sx={{
                      mb: 3,
                      mr: 3,
                      p: 1,
                      width: "30%",
                      borderColor: `${
                        projectsId.includes(
                          projectsId.find((id) => id === project.id)
                        )
                          ? "primary.main"
                          : null
                      }`,
                    }}
                    variant="outlined"
                    key={index}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h5" component="div">
                          {project.name}
                        </Typography>
                        <Checkbox
                          disabled={isLoading}
                          checked={projectsId.includes(project.id)}
                          value={projectsId}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setProjectId([...projectsId, project.id]);
                            } else {
                              setProjectId(
                                projectsId.filter(
                                  (projectId) => projectId !== project.id
                                )
                              );
                            }
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </Box>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {project.member.length}{" "}
                        {project.member.length > 1
                          ? translationsProjectsList.members
                          : translationsProjectsList.member}
                      </Typography>
                      <Typography variant="body2">
                        {project.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        {translationsProjectsList.viewDetail}
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          ) : (
            <Box
              sx={{
                minWidth: 275,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {userProjects.map((project, index) => {
                return (
                  <Card
                    sx={{
                      mb: 3,
                      mr: 3,
                      p: 1,
                      width: "30%",
                      borderColor: `${
                        projectsId.includes(
                          projectsId.find((id) => id === project.id)
                        )
                          ? "primary.main"
                          : null
                      }`,
                    }}
                    variant="outlined"
                    key={index}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h5" component="div">
                          {project.name}
                        </Typography>
                        <Checkbox
                          disabled={isLoading}
                          checked={projectsId.includes(project.id)}
                          value={projectsId}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setProjectId([...projectsId, project.id]);
                            } else {
                              setProjectId(
                                projectsId.filter(
                                  (projectId) => projectId !== project.id
                                )
                              );
                            }
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </Box>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {project.member.length}{" "}
                        {project.member.length > 1
                          ? translationsProjectsList.members
                          : translationsProjectsList.member}
                      </Typography>
                      <Typography variant="body2">
                        {project.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        {translationsProjectsList.viewDetail}
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          Please <Link to="/login">login</Link> to use this site
        </Box>
      )}
    </Box>
  );
}
