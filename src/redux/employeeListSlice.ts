import { EmployeeListResponseType, EmployeeType } from "./../constants/type";
import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS } from "../configs/api";

type initialStateType = {
  employeeList: EmployeeType[];

  lastPage: number;
  dataFrom: number;
  dataTo: number;
  total: number;
  loading: boolean;
};
const initialState: initialStateType = {
  employeeList: [],
  lastPage: 0,
  dataFrom: 0,
  dataTo: 0,
  total: 0,
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
    return res.data.data;
  }
);
export const employeeListSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeList.fulfilled, (state, action: PayloadAction<EmployeeListResponseType>) => {
        state.employeeList = action.payload.data;
        state.lastPage = action.payload.last_page;
        state.total = action.payload.total;
        state.loading = false;
        state.dataFrom = action.payload.from;
        state.dataTo = action.payload.to;
      });
  }
});
const employeeListReducer = employeeListSlice.reducer;
export default employeeListReducer;
