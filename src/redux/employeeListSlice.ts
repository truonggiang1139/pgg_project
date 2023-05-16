import { useSelector } from "react-redux";
import { EmployeeType } from "./../constants/type";
import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS } from "../configs/api";
import { RootState } from "../store";

type initialStateType = {
  employeeList: EmployeeType[];
  query: string;
  page: number;
  loading: boolean;
};
const initialState: initialStateType = {
  employeeList: [],
  query: "",
  page: 1,
  loading: false
};

export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (array: number[]) => {
  let token = Cookies.get("token");
  const res = await axios.delete(`${API_PATHS.employee}/multiple-delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { record_ids: array }
  });

  return res.data.data;
});
export const getEmployeeList = createAsyncThunk(
  "employee/getEmployeeList",
  async ({ query, page }: { query: string; page: number }) => {
    let token = Cookies.get("token");
    const res = await axios.get(`${API_PATHS.employee}?search=${query}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return res.data.data.data;
  }
);
export const employeeListSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {
    changeQuery(state, action) {
      state.query = action.payload;
    },
    changPage(state, action) {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeList.fulfilled, (state, action: PayloadAction<EmployeeType[]>) => {
        state.employeeList = action.payload;

        state.loading = false;
      });
  }
});
export const { changeQuery } = employeeListSlice.actions;
const employeeListReducer = employeeListSlice.reducer;
export default employeeListReducer;
