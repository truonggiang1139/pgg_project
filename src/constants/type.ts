export type LoginFormType = {
  userName: string;
  passWord: string;
  factory: string;
};

export type EmployeeType = {
  name: string;
  gender: number | string;
  mother_name: string;
  dob: string;
  pob: string;
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string;
  mobile_no: string;
  tel_no: string;
  marriage_id: string;
  card_number: string;
  bank_account_no: string;
  bank_name: string;
  family_card_number: string;
  safety_insurance_no: string;
  health_insurance_no: string;
  contract_start_date: string;
  contracts: contractsType[];
  type: string;
  position_id: number | string;
  department_id: number | string;
  entitle_ot: boolean;
  meal_allowance_paid: boolean;
  operational_allowance_paid: "0" | "1";
  attendance_allowance_paid: "0" | "1";
};
export type EmployeeErrorMessageType = {
  name: string;
  gender: string;
  mother_name: string;
  dob: string;
  pob: string;
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string;
  mobile_no: string;
  tel_no: string;
  marriage_id: string;
  card_number: string;
  bank_account_no: string;
  bank_name: string;
  family_card_number: string;
  safety_insurance_no: string;
  health_insurance_no: string;
  contract_start_date: string;
  type: string;
};
export type EmployeeListResponseType = {
  current_page: number;
  data: EmployeeType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    active: boolean;
  };
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type Contract = {
  id: number;
  employee_id: number;
  contract_date: string;
  name: string;
  document: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type FormEmployee = {
  nik: string;
  name: string;
  gender: string;
  motherName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  ktpNo: string;
  nationalCardId: string;
  homeAddress1: string;
  homeAddress2: string;
  mobileNo: string;
  telNo: string;
  marriageStatus: string;
  bankCardNo: string;
  bankAccountNo: string;
  bankName: string;
  familyCardNumber: string;
  safetyInsuranceNo: string;
  healthInsuranceNo: string;
};

export type contractsType = {
  contract_date: string;
  created_at: string;
  deleted_at: null;
  document: string;
  employee_id: number;
  id: number;
  name: string;
  updated_at: string;
};
export type marriageType = {
  code: string;
  company_id: number;
  created_at: string;
  id: number;
  name: string;
  updated_at: null;
};
export type departmentType = {
  code: string;
  company_id: number;
  created_at: string;
  id: number;
  name: string;
  updated_at: null;
};
export type positionType = {
  code: string;
  company_id: number;
  created_at: string;
  id: number;
  name: string;
  updated_at: null;
};
export type genderType = {
  id: number;
  name: string;
};
export type employeeType = {
  id: number;
  name: string;
};
