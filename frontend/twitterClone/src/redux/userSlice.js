import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    otherUsersLoading: false,
    otherUsersError: null,
    profile: null,
  },
  reducers: {
    // multiple actions
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsersLoading: (state) => {
      state.otherUsersLoading = true;
      state.otherUsersError = null;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
      state.otherUsersLoading = false;
      state.otherUsersError = null;
    },
    getOtherUsersError: (state, action) => {
      state.otherUsersLoading = false;
      state.otherUsersError = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    followingUpdate: (state, action) => {
      // unfollow
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter((itemId) => {
          return itemId !== action.payload;
        });
      } else {
        // follow
        state.user.following.push(action.payload);
      }
    },
  },
});
export const {
  getUser,
  getOtherUsers,
  getOtherUsersLoading,
  getOtherUsersError,
  getMyProfile,
  followingUpdate,
} = userSlice.actions;
export default userSlice.reducer;
