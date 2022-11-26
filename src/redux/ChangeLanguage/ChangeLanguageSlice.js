import { createSlice } from "@reduxjs/toolkit";
import { defaultLang, supportedLangs } from "./i18nConfig";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const initialState = {
  lang: defaultLang, // "en" when app loads
  supportedLangs: { ...supportedLangs },
  // We'll keep our translations in Redux to start.
  // Later on we'll move them to their own files so
  // that they're easier to manage.
  translationsSideBar: {
    en: [
      {
        name: "Dashboard",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Team Members",
        path: "/users",
        icon: <GroupIcon />,
      },
      {
        name: "Projects",
        path: "/projects",
        icon: <FolderIcon />,
      },
      {
        name: "About Us",
        path: "/about",
        icon: <InfoIcon />,
      },
      {
        name: "Trash",
        path: "/trash",
        icon: <DeleteOutlineIcon />,
      },
    ],
    vi: [
      {
        name: "Bảng tin",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Thành viên",
        path: "/users",
        icon: <GroupIcon />,
      },
      {
        name: "Dự án",
        path: "/projects",
        icon: <FolderIcon />,
      },
      {
        name: "Giới thiệu",
        path: "/about",
        icon: <InfoIcon />,
      },
      {
        name: "Thùng rác",
        path: "/trash",
        icon: <DeleteOutlineIcon />,
      },
    ],
  },
  translationsUsersList: {
    en: {
      title: "Users List",
      add: "Add user",
      moveToTrash: "Move to trash",
      notify: {
        moveToTrash: "Move to trash successfully!",
      },
    },
    vi: {
      title: "Danh sách người dùng",
      add: "Thêm người dùng",
      moveToTrash: "Chuyển đến thùng rác",
      notify: {
        moveToTrash: "Chuyển vào thùng rác thành công!",
      },
    },
  },
  translationsUsersListTrash: {
    en: {
      title: "Trash",
      restore: "Restore",
      delete: "Delete",
      warningDelete: {
        title: "Are you sure?",
        text: "Once deleted, you will not be able to restore it!",
      },
      notify: {
        restore: "Restore user successfully!",
        delete: "Delete users successfully!",
      },
    },
    vi: {
      title: "Thùng rác",
      restore: "Khôi phục",
      delete: "Xóa",
      warningDelete: {
        title: "Bạn có chắc chắn?",
        text: "Sau khi xóa, bạn sẽ không thể khôi phục nó!",
      },
      notify: {
        restore: "Khôi phục người dùng thành công!",
        delete: "Xóa người dùng thành công!",
      },
    },
  },
  translationsUsersListTable: {
    en: [
      { field: "userId", headerName: "User ID", width: 100 },
      { field: "firstName", headerName: "First name", width: 150 },
      { field: "lastName", headerName: "Last name", width: 150 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "password", headerName: "Password", width: 150 },
      { field: "role", headerName: "Role", width: 150 },
      {
        field: " ",
        width: 200,
        renderCell: (cellValues) => {
          return (
            <Button variant="contained" color="primary">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/userdetail/${cellValues.id}`}
              >
                View
              </Link>
            </Button>
          );
        },
      },
    ],
    vi: [
      { field: "userId", headerName: "ID người dùng", width: 100 },
      { field: "firstName", headerName: "Tên", width: 150 },
      { field: "lastName", headerName: "Họ", width: 150 },
      { field: "email", headerName: "Email", width: 250 },
      { field: "password", headerName: "Mật khẩu", width: 150 },
      { field: "role", headerName: "Vai trò", width: 150 },
      {
        field: " ",
        width: 200,
        renderCell: (cellValues) => {
          return (
            <Button variant="contained" color="primary">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/userdetail/${cellValues.id}`}
              >
                Chi tiết
              </Link>
            </Button>
          );
        },
      },
    ],
  },
  translationsProjectsList: {
    en: {
      title: "Projects List",
      member: "member",
      members: "members",
      viewDetail: "View detail",
      add: "Add",
      delete: "Delete",
      warningDelete: {
        title: "Are you sure?",
        text: "Once deleted, you will not be able to restore it!",
      },
      notify: {
        delete: "Delete project successfully!",
      },
    },
    vi: {
      title: "Danh sách dự án",
      member: "thành viên",
      members: "thành viên",
      viewDetail: "Chi tiết",
      add: "Thêm dự án",
      delete: "Xóa dự án",
      warningDelete: {
        title: "Bạn có chắc chắn?",
        text: "Sau khi xóa, bạn sẽ không thể khôi phục nó!",
      },
      notify: {
        delete: "Xóa dự án thành công!",
      },
    },
  },
  translationsProjectDetail: {
    en: {
      title: "Detail of project",
      projectName: "Project name",
      description: "Description",
      addMember: "Add member",
      update: "Update",
      warningUpdate: {
        title: "Are you sure?",
        text: "Once updated, you will not be able to restore it!",
      },
      warningDelete: {
        title: "Are you sure?",
        text: "Once deleted, you will not be able to restore it!",
      },
      notify: {
        update: "Update successfully!",
        delete: "Member removed from the project successfully!",
      },
    },
    vi: {
      title: "Chi tiết dự án",
      projectName: "Tên dự án",
      description: "Mô tả",
      addMember: "Thêm thành viên",
      update: "Cập nhật",
      warningUpdate: {
        title: "Bạn có chắc chắn?",
        text: "Sau khi cập nhật, bạn sẽ không thể khôi phục nó!",
      },
      warningDelete: {
        title: "Bạn có chắc chắn?",
        text: "Sau khi xóa, bạn sẽ không thể khôi phục nó!",
      },
      notify: {
        update: "Cập nhật thành công",
        delete: "Đã xóa thành viên khỏi dự án thành công!",
      },
    },
  },
  translationsAddProject: {
    en: {
      title: "Add Project",
      projectName: "Project name",
      description: "Description",
      confirm: "Confirm",
      notify: {
        title: "Create project successfully!",
      },
      error: {
        title: "Project already exists!",
      },
    },
    vi: {
      title: "Thêm dự án",
      projectName: "Tên dự án",
      description: "Mô tả",
      confirm: "Xác nhận",
      notify: {
        title: "Tạo dự án thành công!",
      },
      error: {
        title: "Dự án đã tồn tại!",
      },
    },
  },
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const selectTranslationsSideBar = (state) =>
  state.i18n.translationsSideBar[state.i18n.lang];

export const selectTranslationsUsersList = (state) =>
  state.i18n.translationsUsersList[state.i18n.lang];

export const selectTranslationsUsersListTrash = (state) =>
  state.i18n.translationsUsersListTrash[state.i18n.lang];

export const selectTranslationsUsersListTable = (state) =>
  state.i18n.translationsUsersListTable[state.i18n.lang];

export const selectTranslationsProjectsList = (state) =>
  state.i18n.translationsProjectsList[state.i18n.lang];

export const selectTranslationsProjectDetail = (state) =>
  state.i18n.translationsProjectDetail[state.i18n.lang];

export const selectTranslationsAddProject = (state) =>
  state.i18n.translationsAddProject[state.i18n.lang];

export const { setLang } = i18nSlice.actions;

export default i18nSlice.reducer;
