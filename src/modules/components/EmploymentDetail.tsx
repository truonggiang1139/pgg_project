import { Checkbox, Typography } from "@mui/material";
import React, { useContext } from "react";
import SelectForm from "./SelectForm";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { employeeContext } from "../pages/CreateOrUpdatePage";
import { CustomCheckBox } from "../../CustomStyle/StyleCheckBox";
import { ReactComponent as IconCheckbox } from "../../assets/iconCheckBox.svg";
import { changeEmployeeForm } from "../../redux/employeeSlice";
export default function EmploymentDetail() {
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const dispatch = useAppDispatch();
  const { department, position } = useContext(employeeContext);

  return (
    <div className="mt-3 w-full rounded-xl bg-dataTable  p-6 px-4">
      <header className="flex  items-center justify-between">
        <Typography className="font-semibold" variant="h6">
          Employment Details
        </Typography>
        <div className="text-sm">
          Required(<span className="text-base text-red-500 ">*</span>)
        </div>
      </header>
      <hr
        style={{
          margin: "10px 0px",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)"
        }}
      />
      <div className="w-1/2">
        <SelectForm
          label="Department"
          value={String(employeeForm.department_id ?? "")}
          selectList={department}
          defaultValue="Choose Department"
          target={"department_id"}
          errorMessage={""}
          required={""}
        />
        <SelectForm
          label="Position"
          value={String(employeeForm.position_id ?? "")}
          selectList={position}
          defaultValue="Choose Position"
          target={"position_id"}
          errorMessage={""}
          required={""}
        />
      </div>
      <div className="-ml-3 flex items-center">
        <CustomCheckBox
          checked={!!employeeForm.entitle_ot}
          onChange={() => {
            dispatch(changeEmployeeForm({ target: "entitle_ot", value: !employeeForm.entitle_ot }));
            dispatch(
              changeEmployeeForm({
                target: "operational_allowance_paid",
                value: String(Number(!employeeForm.entitle_ot))
              })
            );
            dispatch(
              changeEmployeeForm({
                target: "attendance_allowance_paid",
                value: String(Number(!employeeForm.entitle_ot))
              })
            );
          }}
          icon={<IconCheckbox stroke={"#DFE3E6"} fill={"white"} />}
        />
        <label className="ml-3" htmlFor="">
          Entitled OT
        </label>
      </div>
      <div className="-ml-3 flex  items-center ">
        <CustomCheckBox
          value={employeeForm.meal_allowance_paid}
          onChange={() =>
            dispatch(changeEmployeeForm({ target: "meal_allowance_paid", value: employeeForm.meal_allowance_paid }))
          }
          icon={<IconCheckbox stroke={"#DFE3E6"} fill={"white"} />}
        />
        <label className="ml-3" htmlFor="">
          Meal Allowance Paid
        </label>
      </div>
      <div className="-ml-3 flex items-center">
        <CustomCheckBox
          disabled
          checked={employeeForm.operational_allowance_paid === "0"}
          value={employeeForm.operational_allowance_paid}
          icon={<IconCheckbox stroke={"#DFE3E6"} fill={"#F1F3F5"} />}
        />
        <label className="ml-3" htmlFor="">
          Operational Allowance Paid
        </label>
      </div>
      <div className="-ml-3 flex items-center">
        <CustomCheckBox
          disabled
          checked={employeeForm.attendance_allowance_paid === "0"}
          value={employeeForm.attendance_allowance_paid}
          icon={<IconCheckbox stroke={"#DFE3E6"} fill={"#F1F3F5"} />}
        />
        <label className="ml-3" htmlFor="">
          Attendance Allowance Paid
        </label>
      </div>
    </div>
  );
}
