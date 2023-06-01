import { Typography } from "@mui/material";
import InputForm from "./InputForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function SalarynWages() {
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const errorMessage = useSelector((state: RootState) => state.employee.errorMessage);
  return (
    <div className="mt-3 w-full rounded-xl bg-dataTable  p-6 px-4">
      <header className="flex  items-center justify-between">
        <Typography className="font-semibold" variant="h6">
          Salary & Wages
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
        <InputForm
          label="Basic Salary"
          type="number"
          value={employeeForm.basic_salary}
          target="basic_salary"
          errorMessage={errorMessage.basic_salary}
          required="Salary"
          length={30}
          arrow={false}
        />
        <InputForm
          label="Basic Salary (Audit)"
          type="number"
          value={employeeForm.audit_salary}
          target="audit_salary"
          errorMessage={errorMessage.audit_salary}
          required="Salary (Audit)"
          length={30}
          arrow={false}
        />
        <InputForm
          label="Safety Insurance Amount"
          type="number"
          value={employeeForm.safety_insurance}
          target="safety_insurance"
          errorMessage={errorMessage.safety_insurance}
          required="Safety Insurance Amount"
          length={30}
          arrow={false}
        />
        <InputForm
          label="Healthy Insurance Amount"
          type="number"
          value={employeeForm.health_insurance}
          target="health_insurance"
          errorMessage={errorMessage.health_insurance}
          required=""
          length={30}
          arrow={false}
        />
        <InputForm
          label="Meal Allowance"
          type="number"
          value={employeeForm.meal_allowance}
          target="meal_allowance"
          errorMessage={errorMessage.meal_allowance}
          required="Meal Allowance"
          length={30}
          arrow={false}
        />
      </div>
    </div>
  );
}
