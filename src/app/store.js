import { configureStore } from "@reduxjs/toolkit";
import changeMode from "../redux/Mode/ModeSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import i18nReducer from "../redux/ChangeLanguage/ChangeLanguageSlice";
import getIdBlog from "../redux/Users/UsersSlice";
import getUsersList from "../redux/Users/UsersSlice";
import getUserById from "../redux/Users/UsersSlice";
import getUsersListTrash from "../redux/Users/UsersSlice";
import getIdListToRestore from "../redux/Users/UsersSlice";
import postUsersList from "../redux/Users/UsersSlice";
import moveUsersToTrash from "../redux/Users/UsersSlice";
import getLoading from "../redux/Loading/LoadingSlice";
import userRegistration from "../redux/Register/Register";
import getProjectsList from "../redux/Projects/ProjectsSlice";
import getProjectId from "../redux/Projects/ProjectsSlice";
import getProjectById from "../redux/Projects/ProjectsSlice";
import moveProjectToTrash from "../redux/Projects/ProjectsSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    changeMode: changeMode,
    i18n: i18nReducer,
    getIdBlog: getIdBlog,
    getUsersList: getUsersList,
    getUserById: getUserById,
    getUsersListTrash: getUsersListTrash,
    getIdListToRestore: getIdListToRestore,
    postUsersList: postUsersList,
    moveUsersToTrash: moveUsersToTrash,
    getLoading: getLoading,
    userRegistration: userRegistration,

    getProjectId: getProjectId,
    getProjectsList: getProjectsList,
    getProjectById: getProjectById,
    moveProjectToTrash: moveProjectToTrash,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
