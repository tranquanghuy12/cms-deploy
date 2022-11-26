import { put, takeLatest, call } from "redux-saga/effects";
import {
  getIdBlog,
  getUserById,
  getUsersList,
  getUsersListById,
  getUsersListTrash,
  postUsersList,
} from "../redux/Users/UsersSlice";
import { http } from "../util/config";
import swal from "sweetalert";
import { createAction } from "@reduxjs/toolkit";
import { getLoading } from "../redux/Loading/LoadingSlice";
import {
  getProjectById,
  getProjectsList,
} from "../redux/Projects/ProjectsSlice";

export const getAllUsers = createAction("Users/getAllUsers");
export const getAllUsersTrash = createAction("Users/getAllUsersTrash");
export const getLoadingOnRefresh = createAction("Loading/getLoadingOnRefresh");
export const getAllProjects = createAction("Projects/getAllProjects");
export const postProject = createAction("Projects/postProject");

function* watchLoadingOnRefresh() {
  yield put(getLoading(true));
  yield put(getLoading(false));
}

// get all users
function* watchGetUsersList() {
  try {
    yield put(getLoading(true));
    const res = yield call(http.get, "/blogs");
    yield put(getUsersList(res.data));
    yield put(getLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetUserById(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(http.get, `/blogs/${action.payload}`);
    yield put(getUserById(res.data));
    yield put(getLoading(false));
  } catch (error) {
    console.log(error);
  }
}

// get users by id that are move to trash
function* watchGetUsersMoveToTrash(action) {
  let usersToTrash = [];
  try {
    for (let i in action.payload) {
      const res = yield call(http.get, `/blogs/${action.payload[i]}`);
      usersToTrash.push(res.data);
    }

    // post usersToTrash to trash
    for (let i in usersToTrash) {
      const res = yield call(http.post, "/trash", usersToTrash[i]);
      console.log("res", res.data);
    }
  } catch (error) {
    console.log(error);
  }
}

// get all users in trash
function* watchGetUsersTrash() {
  try {
    yield put(getLoading(true));
    const res = yield call(http.get, "/trash");
    yield put(getUsersListTrash(res.data));
    yield put(getLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* watchPostUsersList(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(http.post, "/blogs", action.payload);
    if (res.status === 201) {
      swal({
        title: "Add user successfully",
        icon: "success",
      });
    }
    yield put(getLoading(false));
  } catch (error) {
    swal({
      title: "Add user failed",
      icon: "error",
    });
    console.log(error);
  }
}

function* watchUpdateUser(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(
      http.put,
      `/blogs/${action.payload.id}`,
      action.payload
    );
    console.log("Update user", res);
    yield put(getLoading(false));
  } catch (error) {
    console.log(error);
  }
}

// move to trash
function* watchMoveUsersToTrash(action) {
  try {
    yield put(getLoading(true));
    for (let i in action.payload) {
      const res = yield call(http.delete, `/blogs/${action.payload[i]}`);
    }
    yield put(getLoading(false));

    // re-render Users component
    yield put(getAllUsers());
  } catch (error) {
    swal({
      title: "Move to trash failed",
      icon: "error",
    });
    console.log(error);
  }
}

// restore from trash
function* watchRestoreUsers(action) {
  try {
    yield put(getLoading(true));
    // post users want to restore to usersList, then delete those users.
    for (let i in action.payload) {
      const res = yield call(http.get, `/trash/${action.payload[i]}`);
      const resToPost = yield call(http.post, "/blogs", res.data);
    }
    for (let i in action.payload) {
      const res = yield call(http.delete, `/trash/${action.payload[i]}`);
    }
    yield put(getLoading(false));

    // re-render Trash component
    yield put(getAllUsersTrash());
  } catch (error) {
    swal({
      title: "Restore user failed",
      icon: "error",
    });
    console.log(error);
  }
}

//delete users from trash
function* watchDeleteUsers(action) {
  try {
    yield put(getLoading(true));
    for (let i in action.payload) {
      const res = yield call(http.delete, `/trash/${action.payload[i]}`);
    }
    yield put(getLoading(false));

    //re-render Trash component
    yield put(getAllUsersTrash());
  } catch (error) {
    swal({
      title: "Delete users failed",
      icon: "error",
    });
    console.log(error);
  }
}

function* watchRegister(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(http.post, "/blogs", action.payload);
    if (res.status === 201) {
      swal({
        title: "Register successfully",
        icon: "success",
      });
    }
    yield put(getLoading(false));
  } catch (error) {
    swal({
      title: "Registration failed",
      icon: "error",
    });
    console.log(error);
  }
}

// get all projects
function* watchGetProjectsList(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(http.get, "/projects");
    yield put(getLoading(false));
    yield put(getProjectsList(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchGetProjectById(action) {
  try {
    const res = yield call(http.get, `/projects/${action.payload}`);
    yield put(getProjectById(res.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchPostProject(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(http.post, "/projects", action.payload);
    yield put(getLoading(false));

    //re-render projects list
    yield put(getAllProjects());
  } catch (error) {
    swal({
      title: "Create project failed",
      icon: "error",
    });
    console.log(error);
  }
}

function* watchUpdateProject(action) {
  try {
    yield put(getLoading(true));
    const res = yield call(
      http.put,
      `/projects/${action.payload.id}`,
      action.payload
    );
    yield put(getLoading(false));
  } catch (error) {
    swal({
      title: "Update failed!",
      icon: "error",
    });
    console.log(error);
  }
}

function* watchMoveProjectsToTrash(action) {
  try {
    yield put(getLoading(true));
    for (let i in action.payload) {
      const res = yield call(http.delete, `/projects/${action.payload[i]}`);
    }
    yield put(getLoading(false));

    //re-render Projects component
    yield put(getAllProjects());
  } catch (error) {
    swal({
      title: "Delete projects failed",
      icon: "error",
    });
    console.log(error);
  }
}

export default function* rootSaga() {
  yield takeLatest(getLoadingOnRefresh, watchLoadingOnRefresh);
  yield takeLatest(getAllUsers, watchGetUsersList);
  yield takeLatest("Users/getIdBlog", watchGetUserById);
  yield takeLatest("Users/getIdBlogList", watchGetUsersMoveToTrash);
  yield takeLatest(getAllUsersTrash, watchGetUsersTrash);
  yield takeLatest("Users/postUsersList", watchPostUsersList);
  yield takeLatest("Users/updateUser", watchUpdateUser);
  yield takeLatest("Users/moveUsersToTrash", watchMoveUsersToTrash);
  yield takeLatest("Users/getIdListToRestore", watchRestoreUsers);
  yield takeLatest("Users/deleteUsers", watchDeleteUsers);
  yield takeLatest("Register/userRegistration", watchRegister);

  yield takeLatest(getAllProjects, watchGetProjectsList);
  yield takeLatest("Projects/getProjectId", watchGetProjectById);
  yield takeLatest(postProject, watchPostProject);
  yield takeLatest("Projects/updateProject", watchUpdateProject);
  yield takeLatest("Projects/moveProjectToTrash", watchMoveProjectsToTrash);
}
