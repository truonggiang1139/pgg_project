import { EmployeeListResponseType, EmployeeType, contractFormType, personalFormType } from "./../constants/type";
import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS } from "../configs/api";

type initialStateType = {
  personalForm: personalFormType;
  personFormError: boolean;
  contractForm: contractFormType;
  contractFormError: boolean;
};
const initialState: initialStateType = {
  personalForm: {
    name: "",
    gender: "",
    mother_name: "",
    dob: "",
    pob: "",
    ktp_no: "",
    nc_id: "",
    home_address_1: "",
    home_address_2: "",
    mobile_no: "",
    tel_no: "",
    marriage_id: "",
    card_number: "",
    bank_account_no: "",
    bank_name: "",
    family_card_number: "",
    safety_insurance_no: "",
    health_insurance_no: ""
  },
  personFormError: false,
  contractForm: {
    contract_start_date: "",
    contracts: [
      {
        contract_date: "string",
        created_at: "2023/05/11",
        deleted_at: null,
        document: "string",
        employee_id: 1,
        id: 1,
        name: "abc",
        updated_at: "string"
      }
    ],
    type: ""
  },
  contractFormError: false
};
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetForm: (state) => {
      state = initialState;
    },
    putPersonalForm: (state, action: PayloadAction<personalFormType>) => {
      state.personalForm = action.payload;
      state.personFormError = !(
        !!action.payload.name.length &&
        action.payload.gender !== "" &&
        !!action.payload.dob.length &&
        !!action.payload.ktp_no.length &&
        !!action.payload.nc_id.length
      );
    },
    putContractForm: (state, action: PayloadAction<contractFormType>) => {
      state.contractForm = action.payload;
      state.personFormError = !(!!action.payload.contract_start_date && !!action.payload.type);
    }
  }
});
export const { putPersonalForm, resetForm, putContractForm } = employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
