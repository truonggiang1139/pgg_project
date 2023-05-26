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
import { RootState, useAppDispatch } from "../../store";
import { marriageType, personalFormType } from "../../constants/type";
import axios from "axios";
import { putPersonalForm } from "../../redux/employeeSlice";
import { API_PATHS } from "../../configs/api";
import iconError from "../../assets/iconError.svg";
type personalType = {
  personalForm: personalFormType;
  marriageStatus: marriageType[];
  handleChangeValuePersonalForm: (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | string,
    target: string
  ) => void;
  errorMessage: personalFormType;
  validatePersonalForm: (value: string, target: string, required: string, length: number) => void;
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
  const dispatch = useAppDispatch();
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
  const validatePersonalForm = useCallback((value: string, target: string, required: string, length: number) => {
    if (value.length === 0 && required) {
      setErrorMessage((prev) => ({ ...prev, [target]: `Please input ${required}` }));
    } else if (value.length > length) {
      setErrorMessage((prev) => ({ ...prev, [target]: `Maximum length is ${length} characters` }));
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
    const res = await axios.get(API_PATHS.marriage, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });
    setMarriageStatus(res.data.data);
  };
  useEffect(() => {
    getDataMarriage();
    setTimeout(() => {
      dispatch(putPersonalForm(personalForm));
    }, 2000);
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    if (tab === 0) {
      dispatch(putPersonalForm(personalForm));
    }
    setTab(newTab);
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
              <CustomeTab
                label={
                  errorPersonalForm ? (
                    <div className="flex">
                      Employee Information
                      <span className="ml-2">
                        <img src={iconError} />
                      </span>
                    </div>
                  ) : (
                    "Employee Information"
                  )
                }
                data-value={errorPersonalForm}
              />

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
          </div>
          <footer className="sticky top-full p-8 text-xs">Copyright © 2022. All Rights Reserved</footer>
        </div>
      </div>
    </div>
  );
}
