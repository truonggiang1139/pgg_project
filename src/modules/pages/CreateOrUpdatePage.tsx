import React, { createContext, useEffect, useMemo, useState } from "react";
import SideBar from "../components/SideBar";
import BreadCrumbs from "../components/BreadCrumbs";
import Cookies from "js-cookie";
import logo from "../../assets/Rectangle 4.svg";
import { Button } from "@mui/material";
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

type personalType = {
  personalForm: personalFormType;
  marriageStatus: marriageType[];
};
export const personalContext = createContext<personalType>({
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
  marriageStatus: [
    {
      code: "MK01",
      company_id: 1,
      created_at: "2023-04-27T09:41:28.000000Z",
      id: 3,
      name: "Married with 1 kid",
      updated_at: null
    }
  ]
});
export default function CreateOrUpdatePage() {
  const [value, setValue] = useState(0);

  const [marriageStatus, setMarriageStatus] = useState<marriageType[]>([]);
  const errorPersonalForm = useSelector((state: RootState) => state.employee.personFormError);
  const personalForm = useSelector((state: RootState) => state.employee.personalForm);
  const personalValueContext = useMemo(() => {
    return { personalForm, marriageStatus };
  }, []);

  const getDataMarriage = async () => {
    const res = await axios.get("https://api-training.hrm.div4.pgtest.co/api/v1/marriage", {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });
    setMarriageStatus(res.data.data);
  };
  useEffect(() => {
    getDataMarriage();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
            <CustomTabs value={value} onChange={handleChange}>
              <CustomeTab label="Employee Information" data-value={errorPersonalForm} />
              <CustomeTab label="Contract Information" data-value={true} />
              <CustomeTab label="Employment Details" />
              <CustomeTab label="Salary & Wages" />
              <CustomeTab label="Others" />
            </CustomTabs>
            {value == 0 && (
              <personalContext.Provider value={personalValueContext}>
                <PersonaIInfor />
              </personalContext.Provider>
            )}
            {value == 1 && <ContractInfor />}
            {value == 2 && <EmploymentDetail />}
            {value == 3 && <SalarynWages />}
            {value == 4 && <Others />}
          </div>
          <footer className="sticky top-full p-8 text-xs">Copyright © 2022. All Rights Reserved</footer>
        </div>
      </div>
    </div>
  );
}
