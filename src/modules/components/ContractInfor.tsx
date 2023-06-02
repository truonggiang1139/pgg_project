import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import DatePick from "./DatePick";
import ContractForm from "./ContractForm";

import { employeeTypeType } from "../../constants/type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SelectForm from "./SelectForm";

export default function ContractInfor() {
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const errorMessage = useSelector((state: RootState) => state.employee.errorMessage);
  const selectList: employeeTypeType[] = useMemo(
    () => [
      { id: 0, name: "Permanent" },
      { id: 1, name: "Part-time" },
      { id: 2, name: "Contract" }
    ],
    []
  );

  return (
    <div className="mt-3 w-full rounded-xl bg-dataTable  p-6 px-4">
      <header className="flex  items-center justify-between">
        <Typography variant="h6">Contract Information</Typography>
        <div className="text-sm">
          Required<span className="text-base text-red-500 ">*</span>
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
      <div className="flex justify-between px-3">
        <div className=" flex w-2/5 flex-col">
          <DatePick
            label="Date of birth"
            value={employeeForm.contract_start_date}
            errorMessage={errorMessage.contract_start_date}
            target="contract_start_date"
          />
          <SelectForm
            label="Employee Type"
            value={employeeForm.type}
            selectList={selectList}
            defaultValue="Choose Type"
            target="type"
            errorMessage={errorMessage.type}
            required={"Employee Type"}
          />
        </div>
      </div>

      <ContractForm />
    </div>
  );
}
