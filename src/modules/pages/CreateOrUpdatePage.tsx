import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import BreadCrumbs from "../components/BreadCrumbs";
import Cookies from "js-cookie";
import logo from "../../assets/Rectangle 4.svg";
import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { CustomTabs } from "../../CustomStyle/StyleTabs";
import { CustomeTab } from "../../CustomStyle/StyleTab";
import PersonaIInfor from "../components/PersonaIInfor";
import ContractInfor from "../components/ContractInfor";
import EmploymentDetail from "../components/EmploymentDetail";
import SalarynWages from "../components/SalarynWages";
import Others from "../components/Others";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { marriageType, personalFormType } from "../../constants/type";
import axios from "axios";
import { styled } from "@mui/material";
const StyledFilledInput = styled(TextField)({
  width: "308px",
  borderRadius: "6px",
  backgroundColor: "rgb(241, 243, 245)",
  "& .MuiFilledInput-input": {
    padding: "12px",
    paddingLeft: "0"
  },
  "&.Mui-focused": {
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  },
  "&.MuiFilledInput-root:hover": {
    backgroundColor: "rgb(241, 243, 245)"
  },
  "& .MuiTypography-root": {
    color: "rgb(0, 106, 220)"
  }
});
type personalType = {
  personalForm: personalFormType;
  marriageStatus: marriageType[];
  handleChangeValuePersonalForm: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | string,
    target: string
  ) => void;
  errorMessage: personalFormType;
  validatePersonalForm: (value: string, target: string) => void;
};
export const personalContext = createContext<personalType>({
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
  marriageStatus: [
    {
      code: "MK01",
      company_id: 1,
      created_at: "2023-04-27T09:41:28.000000Z",
      id: 3,
      name: "Married with 1 kid",
      updated_at: null
    }
  ],
  handleChangeValuePersonalForm: () => {},
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
    health_insurance_no: ""
  },
  validatePersonalForm: () => {}
});
export default function CreateOrUpdatePage() {
  const [tab, setTab] = useState(0);
  const [marriageStatus, setMarriageStatus] = useState<marriageType[]>([]);
  const errorPersonalForm = useSelector((state: RootState) => state.employee.personFormError);
  const [personalForm, setPersonalForm] = useState(useSelector((state: RootState) => state.employee.personalForm));
  const [errorMessage, setErrorMessage] = useState({
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
  });
  const validatePersonalForm = useCallback((value: string, target: string) => {
    if (
      value.length === 0 &&
      (target === "name" || target === "gender" || target == "dob" || target === "ktp_no" || target === "nc_id")
    ) {
      setErrorMessage((prev) => ({ ...prev, [target]: `Please input ${target}` }));
    } else if (value.length > 50) {
      setErrorMessage((prev) => ({ ...prev, [target]: "Maximum length is 50 characters" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, [target]: "" }));
    }
  }, []);

  const handleChangeValuePersonalForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | string, target: string) => {
      let value: string;
      if (typeof e === "object" && "target" in e) {
        value = e.target.value;
      } else {
        value = e;
      }
      setPersonalForm((prev) => ({ ...prev, [target]: value }));
    },
    []
  );

  const personalValueContext = useMemo(() => {
    return { personalForm, marriageStatus, handleChangeValuePersonalForm, errorMessage, validatePersonalForm };
  }, [personalForm, marriageStatus, handleChangeValuePersonalForm, errorMessage, validatePersonalForm]);

  const getDataMarriage = async () => {
    const res = await axios.get("https://api-training.hrm.div4.pgtest.co/api/v1/marriage", {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });
    setMarriageStatus(res.data.data);
  };
  useEffect(() => {
    getDataMarriage();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setError(!validateInput(value));
  };

  const validateInput = (value: string): boolean => {
    const isNotEmpty: boolean = value.trim() !== "";
    const hasValidLength: boolean = value.length <= 10;
    // Add more validation rules as needed

    return isNotEmpty && hasValidLength;
  };

  return (
    <div className="flex flex-col ">
      <header className="fixed left-0 right-0 top-0 z-30 flex h-16 flex-row bg-white px-8 py-2 shadow-md ">
        <div className="flex items-center">
          <img src={logo} alt="" className="mr-3 h-9 w-9" />
          <div className="text-2xl font-semibold">HR Management System</div>
        </div>
      </header>
      <div className=" mt-16 flex  min-h-screen w-full ">
        <SideBar />
        <div className="   ml-1/5 flex  w-4/5 flex-col bg-rightContent  ">
          <div className="mx-auto mt-8 w-11/12 ">
            <BreadCrumbs />
            <div className="my-4 flex justify-between">
              <div className=" text-left text-3xl">Employee Management</div>
              <Button>Add </Button>
            </div>
            <CustomTabs value={tab} onChange={handleChange}>
              <CustomeTab label="Employee Information" data-value={errorPersonalForm} />
              <CustomeTab label="Contract Information" data-value={true} />
              <CustomeTab label="Employment Details" />
              <CustomeTab label="Salary & Wages" />
              <CustomeTab label="Others" />
            </CustomTabs>
            {tab == 0 && (
              <personalContext.Provider value={personalValueContext}>
                <PersonaIInfor />
              </personalContext.Provider>
            )}
            {tab == 1 && <ContractInfor />}
            {tab == 2 && <EmploymentDetail />}
            {tab == 3 && <SalarynWages />}
            {tab == 4 && <Others />}
            <TextField
              label="My Text Field"
              value={inputValue}
              error={error}
              helperText={error ? "Invalid input. Please check the rules." : "Enter a maximum of 10 characters."}
              inputProps={{
                maxLength: 10
                // Add more rules as needed
              }}
              onChange={handleInputChange}
            />
          </div>
          <footer className="sticky top-full p-8 text-xs">Copyright © 2022. All Rights Reserved</footer>
        </div>
      </div>
    </div>
  );
}
