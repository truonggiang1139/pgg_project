import {
  EmployeeErrorMessageType,
  EmployeeListResponseType,
  EmployeeType,
  documentType,
  gradeType
} from "./../constants/type";
import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS } from "../configs/api";

type dataValueType = {
  target: string;
  value: string | number | boolean | gradeType | null | Number[] | documentType[];
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
  salaryFormError: boolean;
};
const initialState: initialStateType = {
  employeeForm: {
    id: 0,
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
    operational_allowance_paid: "0",
    basic_salary: 0,
    audit_salary: 0,
    safety_insurance: 0,
    health_insurance: 0,
    meal_allowance: 0,
    grade_id: null,
    grade: null,
    benefits: [],
    remark: "",
    documents: [
      {
        created_at: "2023-05-31T08:47:31.000000Z",
        document: "https://api-training.hrm.div4.pgtest.co/storage/documents/6902/TKB_1685522851.png",
        employee_id: 6902,
        id: 271,
        updated_at: null
      }
    ]
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
    type: "",
    basic_salary: "",
    audit_salary: "",
    safety_insurance: "",
    health_insurance: "",
    meal_allowance: ""
  },
  employeeFormError: false,
  contractFormError: false,
  salaryFormError: false
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
    },
    checkValidSalary: (state) => {
      state.salaryFormError = !(
        String(state.employeeForm.basic_salary).length &&
        String(state.employeeForm.audit_salary).length &&
        String(state.employeeForm.safety_insurance).length &&
        String(state.employeeForm.meal_allowance).length
      );
    }
  }
});
export const {
  changeEmployeeForm,
  resetForm,
  checkValidEmployeeForm,
  validateEmployeeForm,
  checkValidContractForm,
  checkValidSalary
} = employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
