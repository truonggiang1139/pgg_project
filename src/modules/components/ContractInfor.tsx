import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import DatePick from "./DatePick";
import SelectForm from "./SelectForm";
import PersonalForm from "./PersonalForm";
import ContractForm from "./ContractForm";

export default function ContractInfor() {
  useEffect(() => {}, []);
  return (
    <div className="mt-3 w-full rounded-xl bg-dataTable  p-6 px-4">
      <header className="flex  items-center justify-between">
        <Typography variant="h6">Contract Information</Typography>
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
      <div className="flex justify-between px-3">
        <div className=" flex w-1/3 flex-col">
          <DatePick label="Date of birth" value="" errorMessage="" />
          <SelectForm
            label="Employee Type"
            defaultValue="Choose Type"
            errorMessage=""
            required="Employee Type"
            target="gender"
            value=""
            selectList={[
              { id: 0, name: "Permanent" },
              { id: 1, name: "Part-time" },
              { id: 2, name: "Contract" }
            ]}
          />
        </div>
      </div>
      <ContractForm />
    </div>
  );
}
