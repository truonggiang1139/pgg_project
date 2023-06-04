import employeeListReducer from "./redux/employeeListSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import employeeReducer from "./redux/employeeSlice";
import userReducer from "./redux/userSlice";

export const store = configureStore({
  reducer: {
    employeeList: employeeListReducer,
    employee: employeeReducer,
    userDetail: userReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
