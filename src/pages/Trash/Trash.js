import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersTrash } from "../../app/rootSaga";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { deleteUsers, getIdListToRestore } from "../../redux/Users/UsersSlice";
import swal from "sweetalert";
import {
  selectTranslationsUsersListTable,
  selectTranslationsUsersListTrash,
} from "../../redux/ChangeLanguage/ChangeLanguageSlice";

export default function Trash() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectionModel, setSelectionModel] = useState([]);

  //including 2 languages for the trash table
  const translationsUsersListTable = useSelector(
    selectTranslationsUsersListTable
  );
  const translationsUsersListTrash = useSelector(
    selectTranslationsUsersListTrash
  );

  const { mode } = useSelector((rootReducer) => rootReducer.changeMode);

  // lang = 'en' or 'vi'
  const { lang } = useSelector((rootReducer) => rootReducer.i18n);

  const { usersListTrash } = useSelector(
    (rootReducer) => rootReducer.getUsersListTrash
  );

  //User login account
  const userData = JSON.parse(localStorage.getItem("User"));

  const { isLoading } = useSelector((rootReducer) => rootReducer.getLoading);

  useEffect(() => {
    dispatch(getAllUsersTrash());
  }, []);

  const handleRestore = async () => {
    try {
      await dispatch(getIdListToRestore(selectionModel));
      swal({
        title: `${translationsUsersListTrash.notify.restore}`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    swal({
      title: `${translationsUsersListTrash.warningDelete.title}`,
      text: `${translationsUsersListTrash.warningDelete.text}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await dispatch(deleteUsers(selectionModel));
          swal({
            title: `${translationsUsersListTrash.notify.delete}`,
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
      {userData?.role === "Admin" ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              {translationsUsersListTrash.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Box sx={{ position: "relative" }}>
                {selectionModel.length !== 0 ? (
                  <Tooltip title={translationsUsersListTrash.restore} arrow>
                    <IconButton
                      disabled={isLoading}
                      variant="contained"
                      color="primary"
                      onClick={handleRestore}
                    >
                      <RestoreFromTrashIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton disabled={true} variant="contained">
                    <RestoreFromTrashIcon />
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
              <Box sx={{ m: 1, position: "relative" }}>
                {selectionModel.length !== 0 ? (
                  <Tooltip title={translationsUsersListTrash.delete} arrow>
                    <IconButton
                      disabled={isLoading}
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton disabled={true} variant="contained">
                    <DeleteForeverIcon />
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

          <Box sx={{ height: 400, width: "100%", mt: 3 }}>
            <DataGrid
              rows={usersListTrash}
              columns={translationsUsersListTable}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              pagination
              loading={isLoading}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              {...translationsUsersListTable}
              sx={{
                backgroundColor: `${mode === "light" ? "white" : "#424242"}`,
              }}
            />
          </Box>
        </Box>
      ) : userData?.role === "Member" ? (
        <Box>Only admins are allowed to use this site</Box>
      ) : (
        <Box>
          Please <Link to="/login">login</Link> to use this site
        </Box>
      )}
    </Box>
  );
}
