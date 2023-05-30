import { EmployeeErrorMessageType, EmployeeListResponseType, EmployeeType } from "./../constants/type";
import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS } from "../configs/api";

type dataValueType = {
  target: string;
  value: string | boolean;
};
type validateDataValueType = {
  target: string;
  value: string;
  required: string;
  length: number;
};
type initialStateType = {
  employeeForm: EmployeeType;
  errorMessage: EmployeeErrorMessageType;
  employeeFormError: boolean;
  contractFormError: boolean;
};
const initialState: initialStateType = {
  employeeForm: {
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
    health_insurance_no: "",
    contract_start_date: "",
    contracts: [],
    type: "",
    department_id: "",
    position_id: "",
    entitle_ot: false,
    meal_allowance_paid: false,
    attendance_allowance_paid: "0",
    operational_allowance_paid: "0"
  },
  errorMessage: {
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
    health_insurance_no: "",
    contract_start_date: "",
    type: ""
  },
  employeeFormError: false,
  contractFormError: false
};
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetForm: (state) => {
      state = initialState;
    },
    changeEmployeeForm: (state, action: PayloadAction<dataValueType>) => {
      const { target, value } = action.payload;
      state.employeeForm = { ...state.employeeForm, [target]: value };
    },
    validateEmployeeForm: (state, action: PayloadAction<validateDataValueType>) => {
      const { target, value, required, length } = action.payload;
      if (value.length === 0 && required) {
        state.errorMessage = { ...state.errorMessage, [target]: `Please input ${required}` };
      } else if (value.length > length) {
        state.errorMessage = { ...state.errorMessage, [target]: `Maximum length is ${length} characters` };
      } else {
        state.errorMessage = { ...state.errorMessage, [target]: "" };
      }
    },
    checkValidEmployeeForm: (state) => {
      state.employeeFormError = !(
        !!state.employeeForm.name.length &&
        state.employeeForm.gender !== "" &&
        !!state.employeeForm.dob.length &&
        !!state.employeeForm.ktp_no.length &&
        !!state.employeeForm.nc_id.length
      );
    },
    checkValidContractForm: (state) => {
      state.contractFormError = !(!!state.employeeForm.contract_start_date.length && state.employeeForm.type !== "");
    }
  }
});
export const { changeEmployeeForm, resetForm, checkValidEmployeeForm, validateEmployeeForm, checkValidContractForm } =
  employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
