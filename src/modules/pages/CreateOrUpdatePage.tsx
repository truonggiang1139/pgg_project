import React, { useState } from "react";
import SideBar from "../components/SideBar";
import BreadCrumbs from "../components/BreadCrumbs";
import logo from "../../assets/Rectangle 4.svg";
import { Button, Tab, Tabs } from "@mui/material";
import { CustomTabs } from "../../CustomStyle/StyleTabs";
import { CustomeTab } from "../../CustomStyle/StyleTab";
import PersonaIInfor from "../components/PersonaIInfor";
import ContractInfor from "../components/ContractInfor";
import EmploymentDetail from "../components/EmploymentDetail";
import SalarynWages from "../components/SalarynWages";
import Others from "../components/Others";
export default function CreateOrUpdatePage() {
  const [value, setValue] = useState(0);
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
      <div className=" mt-16 flex  w-full ">
        <SideBar />
        <div className="   ml-1/5 flex  w-4/5 bg-rightContent ">
          <div className="mx-auto mt-8 w-11/12">
            <BreadCrumbs />
            <div className="my-4 flex justify-between">
              <div className=" text-left text-3xl">Employee Management</div>
              <Button>Add </Button>
            </div>
            <CustomTabs value={value} onChange={handleChange}>
              <CustomeTab label="Employee Information" />
              <CustomeTab label="Contract Information" />
              <CustomeTab label="Employment Details" />
              <CustomeTab label="Salary & Wages" />
              <CustomeTab label="Others" />
            </CustomTabs>
            {value == 0 && <PersonaIInfor />}
            {value == 1 && <ContractInfor />}
            {value == 2 && <EmploymentDetail />}
            {value == 3 && <SalarynWages />}
            {value == 4 && <Others />}
          </div>
        </div>
      </div>
    </div>
  );
}
