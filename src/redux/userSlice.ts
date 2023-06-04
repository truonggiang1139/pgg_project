import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  userName: string;
};
const initialState: initialStateType = {
  userName: ""
};

export const userSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    }
  }
});
export const { setUserName } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
