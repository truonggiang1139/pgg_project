import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import DatePick from "./DatePick";

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
      <div>
        <div className="flex w-48% items-center justify-between">
          <div>Date Start *</div>
          <DatePick
            value=""
            errorMessage=""
            handleChangeDate={(value: string) => {}}
            validateRequiredInput={(value: string | number) => {}}
          />
        </div>
        <div className="mt-4 flex w-48% items-center justify-between">
          <div>Date Start *</div>
          <DatePick
            value=""
            errorMessage=""
            handleChangeDate={(value: string) => {}}
            validateRequiredInput={(value: string | number) => {}}
          />
        </div>
      </div>
    </div>
  );
}
