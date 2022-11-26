import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  usersList: [],
  userById: {},
  usersListTrash: [],
  idList: [],
  idListToResotre: [],
  isLoading: true,
};

export const usersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    getIdBlog: (state, action) => {},
    getIdBlogList: (state, action) => {
      state.idList = action.payload;
    },
    getUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    getUserById: (state, action) => {
      state.userById = action.payload;
    },

    // get users by id that are moved to trash
    getUsersListTrash: (state, action) => {
      state.usersListTrash = action.payload;
    },
    getIdListToRestore: (state, action) => {
      state.idListToResotre = action.payload;
    },
    postUsersList: (state, action) => {
      // state.usersList = action.payload;
    },
    updateUser: (state, action) => {
      state.userById = action.payload;
    },
    moveUsersToTrash: (state, action) => {},
    deleteUsers: (state, action) => {},
  },
});

export const {
  getIdBlog,
  getIdBlogList,
  getUsersList,
  getUserById,
  getUsersListTrash,
  getIdListToRestore,
  postUsersList,
  updateUser,
  moveUsersToTrash,
  deleteUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
