export type LoginFormType = {
  userName: string;
  passWord: string;
  factory: string;
};

export type EmployeeType = {
  id: number;
  old_staff_id: number | null;
  staff_id: string;
  name: string;
  gender: number;
  department_id: number;
  company_id: number;
  manager_id: number | null;
  marriage_id: number;
  position_id: number | null;
  type: string;
  mother_name: string;
  dob: string;
  pob: string | null;
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string | null;
  mobile_no: string | null;
  tel_no: string;
  bank_account_no: string;
  bank_name: string;
  card_number: string | null;
  family_card_number: string;
  health_insurance_no: string;
  safety_insurance_no: string;
  basic_salary: number;
  audit_salary: number;
  health_insurance: number;
  safety_insurance: number;
  meal_allowance: number;
  entitle_ot: number;
  meal_allowance_paid: number;
  operational_allowance_paid: number;
  attendance_allowance_paid: number;
  minimum_salary_used: string;
  contract_start_date: string;
  shift: string;
  grade_id: number;
  remark: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  department_name: string;
  marriage_code: string;
  position_name: string | null;
  grade_prefix: string;
  grade_name: string;
  manager_name: string | null;
  contracts: Contract[];
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

export type personalFormType = {
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
};
export type contractFormType = {
  contract_start_date: string;
  contracts: contractsType[];
  type: string;
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
export type genderType = {
  id: number;
  name: string;
};
export type employeeType = {
  id: number;
  name: string;
};
