import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import SideBar from "../components/SideBar";
import BreadCrumbs from "../components/BreadCrumbs";
import { Button } from "@mui/material";
import { CustomTabs } from "../../CustomStyle/StyleTabs";
import { CustomeTab } from "../../CustomStyle/StyleTab";
import PersonaIInfor from "../components/PersonaIInfor";
import ContractInfor from "../components/ContractInfor";
import EmploymentDetail from "../components/EmploymentDetail";
import SalarynWages from "../components/SalarynWages";
import Others from "../components/Others";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  addEmployee,
  checkInvalidContractForm,
  checkInvalidEmployeeForm,
  checkInvalidSalary,
  getIdEmployee,
  resetForm,
  updateEmployee
} from "../../redux/employeeSlice";
import { API_PATHS } from "../../configs/api";
import iconError from "../../assets/iconError.svg";
import { benefitType, departmentType, gradeType, marriageType, positionType } from "../../constants/type";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type employeeContextType = {
  marriageStatus: marriageType[];
  department: departmentType[];
  position: positionType[];
  grade: gradeType[];
  benefit: benefitType[];
};
export const employeeContext = createContext<employeeContextType>({
  marriageStatus: [],
  department: [],
  position: [],
  grade: [],
  benefit: []
});
export default function CreateOrUpdatePage() {
  const [tab, setTab] = useState(0);
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const { idEmployee } = useParams();
  const employeeErrorTab = useSelector((state: RootState) => state.employee.employeeFormError);
  const contractErrorTab = useSelector((state: RootState) => state.employee.contractFormError);
  const salaryErrorTab = useSelector((state: RootState) => state.employee.salaryFormError);
  const navigate = useNavigate();
  const [data, setData] = useState({
    marriageStatus: [],
    department: [],
    position: [],
    grade: [],
    benefit: []
  });
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    if (tab === 0) {
      dispatch(checkInvalidEmployeeForm());
    }
    if (tab === 1) {
      dispatch(checkInvalidContractForm());
    }
    if (tab == 3) {
      dispatch(checkInvalidSalary());
    }
    setTab(newTab);
  };
  const handleAddOrUpdEmployee = async () => {
    const result: any = await (idEmployee
      ? dispatch(updateEmployee(employeeForm))
      : dispatch(addEmployee(employeeForm)));

    setTimeout(() => {
      navigate("/employee");
    }, 1500);

    toast.warn("", {
      className: "bg-red-100 text-red-600 font-medium"
    });
  };
  const getData = async () => {
    try {
      const apiMarriage = axios.get(API_PATHS.marriage, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      const apiDepartment = axios.get(API_PATHS.department, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      const apiPosition = axios.get(API_PATHS.position, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      const apiGrade = axios.get(API_PATHS.grade, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      const apiBenefit = axios.get(API_PATHS.benefit, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      });
      const [marriageRes, departmentRes, positionRes, gradeRes, benefitRes] = await Promise.all([
        apiMarriage,
        apiDepartment,
        apiPosition,
        apiGrade,
        apiBenefit
      ]);
      setData({
        marriageStatus: marriageRes.data.data,
        department: departmentRes.data.data,
        position: positionRes.data.data,
        grade: gradeRes.data.data,
        benefit: benefitRes.data.data
      });
    } catch (error) {}
  };
  useEffect(() => {
    getData();
    if (idEmployee) {
      dispatch(getIdEmployee(Number(idEmployee)));

      return;
    }
    setTimeout(() => {
      dispatch(checkInvalidEmployeeForm());
    }, 2000);
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col ">
      <Header />
      <div className=" mt-16 flex  min-h-screen w-full ">
        <SideBar />
        <div className="   ml-1/5 flex  w-4/5 flex-col bg-rightContent  ">
          <div className="mx-auto mt-8 w-11/12 ">
            <BreadCrumbs />
            <div className="my-4 flex justify-between">
              <div className=" text-left text-3xl">Employee Management</div>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "rgb(0, 145, 255)",
                  paddingX: "30px",
                  paddingY: "10px",
                  borderRadius: "6px",
                  textTransform: "none"
                }}
                onClick={handleAddOrUpdEmployee}
              >
                {idEmployee ? "Save Charge" : "Add"}
              </Button>
            </div>
            <CustomTabs value={tab} onChange={handleChange}>
              <CustomeTab
                label={
                  employeeErrorTab ? (
                    <div className="flex items-center">
                      Employee Information
                      <span className="ml-2">
                        <img src={iconError} />
                      </span>
                    </div>
                  ) : (
                    "Employee Information"
                  )
                }
                data-value={employeeErrorTab}
              />

              <CustomeTab
                label={
                  contractErrorTab ? (
                    <div className="flex items-center">
                      Contract Information
                      <span className="ml-2">
                        <img src={iconError} />
                      </span>
                    </div>
                  ) : (
                    "Contract Information"
                  )
                }
                data-value={contractErrorTab}
              />
              <CustomeTab label="Employment Details" />
              <CustomeTab
                label={
                  salaryErrorTab ? (
                    <div className="flex items-center">
                      Salary & Wages
                      <span className="ml-2">
                        <img src={iconError} />
                      </span>
                    </div>
                  ) : (
                    "Salary & Wages"
                  )
                }
                data-value={salaryErrorTab}
              />
              <CustomeTab label="Others" />
            </CustomTabs>
            <employeeContext.Provider value={data}>
              {tab == 0 && <PersonaIInfor />}
              {tab == 1 && <ContractInfor />}
              {tab == 2 && <EmploymentDetail />}
              {tab == 3 && <SalarynWages />}
              {tab == 4 && <Others />}
            </employeeContext.Provider>
          </div>
          <footer className="sticky top-full p-8 text-xs">Copyright © 2022. All Rights Reserved</footer>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ width: "300px" }}
      />
    </div>
  );
}
