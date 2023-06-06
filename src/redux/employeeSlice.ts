import {
  EmployeeErrorMessageType,
  EmployeeType,
  contractFormDataType,
  contractsType,
  documentFormDataType,
  documentType,
  gradeType
} from "./../constants/type";
import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS } from "../configs/api";
import { RootState } from "../store";

type dataValueType = {
  target: string;
  value: string | number | boolean | gradeType | null | Number[] | documentType[] | contractsType[];
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
  loading: boolean;
  documentFormData: documentFormDataType;
  contractFormData: contractFormDataType;
};
const initialState: initialStateType = {
  employeeForm: {
    id: 0,
    name: "",
    gender: "",
    staff_id: null,
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
    basic_salary: "0",
    audit_salary: "0",
    safety_insurance: "0",
    health_insurance: "0",
    meal_allowance: "0",
    grade_id: null,
    grade: null,
    benefits: [],
    remark: "",
    documents: [],
    grade_name: null,
    marriage_code: null,
    position_name: null
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
  salaryFormError: false,
  loading: false,
  documentFormData: {
    documents: [],
    employee_id: 1,
    deleted_ids: []
  },
  contractFormData: {
    employee_id: 1,
    names: [],
    contract_dates: [],
    documents: [],
    modified_contracts: []
  }
};

export const getIdEmployee = createAsyncThunk("employeeId/get", async (id: number) => {
  let token = Cookies.get("token");
  const res = await axios.get(`${API_PATHS.employee}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
});
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (body: Omit<EmployeeType, "id">, { getState }) => {
    try {
      let token = Cookies.get("token");
      const res = await axios.post(`${API_PATHS.employee}`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { employee } = getState() as RootState;

      if (body.documents.length) {
        const formdata = new FormData();
        formdata.append("employee_id", res.data.data.id);
        employee.documentFormData.documents.forEach((doc) => formdata.append("documents[]", doc, doc.name));
        await axios.post(`${API_PATHS.uploadDoc}`, formdata, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      if (body.contracts.length) {
        const formdata = new FormData();
        formdata.append("employee_id", res.data.data.id);
        employee.contractFormData.names.forEach((name) => formdata.append("names[]", name));
        employee.contractFormData.contract_dates.forEach((date) => formdata.append("contract_dates[]", date));
        employee.contractFormData.documents.forEach((doc) => formdata.append("documents[]", doc, doc.name));
        formdata.append("modified_contracts[]", "");
        await axios.post(`${API_PATHS.uploadContract}`, formdata, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      return res.data.message;
    } catch (error: any) {
      return error.response.data.message;
    }
  }
);

export const updateEmployee = createAsyncThunk("employee/updateEmployee", async (body: EmployeeType, { getState }) => {
  try {
    let token = Cookies.get("token");
    const res = await axios.put(`${API_PATHS.employee}/${body.id}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { employee } = getState() as RootState;

    if (true) {
      const formdata = new FormData();
      formdata.append("employee_id", String(body.id));
      employee.documentFormData.documents.forEach((doc) => formdata.append("documents[]", doc, doc.name));
      employee.documentFormData.deleted_ids.forEach((id) => formdata.append("deleted_id[]", String(id)));

      await axios.post(`${API_PATHS.uploadDoc}`, formdata, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    const newContract = body.contracts.filter((item) => item.document === "");
    if (newContract.length) {
      const formdata = new FormData();
      formdata.append("employee_id", String(body.id));
      employee.contractFormData.names.forEach((name) => formdata.append("names[]", name));
      employee.contractFormData.contract_dates.forEach((date) => formdata.append("contract_dates[]", date));
      employee.contractFormData.documents.forEach((doc) => formdata.append("documents[]", doc, doc.name));
      formdata.append("modified_contracts[]", "");
      await axios.post(`${API_PATHS.uploadContract}`, formdata, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return res.data.message;
  } catch (error: any) {
    return error.response.data.message;
  }
});
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetForm: () => initialState,
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
    checkInvalidEmployeeForm: (state) => {
      state.employeeFormError = !(
        !!state.employeeForm.name.length &&
        state.employeeForm.gender !== "" &&
        !!state.employeeForm.dob.length &&
        !!state.employeeForm.ktp_no.length &&
        !!state.employeeForm.nc_id.length
      );
    },
    checkInvalidContractForm: (state) => {
      state.contractFormError = !(!!state.employeeForm.contract_start_date.length && state.employeeForm.type !== "");
    },
    checkInvalidSalary: (state) => {
      state.salaryFormError = !(
        String(state.employeeForm.basic_salary).length &&
        String(state.employeeForm.audit_salary).length &&
        String(state.employeeForm.safety_insurance).length &&
        String(state.employeeForm.meal_allowance).length
      );
    },
    addDocumentFile: (state, action: PayloadAction<documentFormDataType>) => {
      const { documents } = action.payload;
      state.documentFormData.documents.push(...documents);
    },
    removeDocumentFile: (state, action: PayloadAction<number>) => {
      let indexToRemove = state.documentFormData.documents.findIndex((obj) => obj.lastModified === action.payload);
      state.documentFormData.documents.splice(indexToRemove, 1);
      state.documentFormData.deleted_ids.push(action.payload);
    },
    addContractFile: (state, action: PayloadAction<contractFormDataType>) => {
      const { names, contract_dates, documents } = action.payload;
      if (names[0] != "") {
        state.contractFormData.names.push(...names);
        state.contractFormData.contract_dates.push(...contract_dates);
        state.contractFormData.documents.push(...documents);
      }
    },
    removeContractFile: (state, action: PayloadAction<number>) => {
      state.contractFormData.documents.splice(action.payload, 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getIdEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIdEmployee.fulfilled, (state, acion) => {
        state.loading = false;
        state.employeeForm = acion.payload;
      });
  }
});
export const {
  changeEmployeeForm,
  resetForm,
  checkInvalidEmployeeForm,
  validateEmployeeForm,
  checkInvalidContractForm,
  checkInvalidSalary,
  addDocumentFile,
  removeDocumentFile,
  addContractFile,
  removeContractFile
} = employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
