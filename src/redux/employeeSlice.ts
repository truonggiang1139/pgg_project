import { EmployeeListResponseType, EmployeeType, personalFormType } from "./../constants/type";
import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS } from "../configs/api";

type initialStateType = {
  personalForm: personalFormType;
  personFormError: boolean;
};
const initialState: initialStateType = {
  personalForm: {
    name: "",
    gender: "",
    mother_name: "",
    dob: "",
    pob: "",
    ktp_no: "",
    nc_id: 0,
    home_address_1: "",
    home_address_2: "",
    mobile_no: 0,
    tel_no: 0,
    marriage_id: 0,
    card_number: "",
    bank_account_no: 0,
    bank_name: "",
    family_card_number: 0,
    safety_insurance_no: 0,
    health_insurance_no: 0
  },
  personFormError: true
};
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    putPersonalForm: (state, action: PayloadAction<personalFormType>) => {
      state.personalForm = action.payload;
      state.personFormError = !(
        !!action.payload.name &&
        !!action.payload.gender &&
        !!action.payload.dob &&
        !!action.payload.ktp_no &&
        !!action.payload.nc_id
      );
    }
  }
});
export const { putPersonalForm } = employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
