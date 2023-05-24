import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PersonalForm from "./PersonalForm";
import { personalContext } from "../pages/CreateOrUpdatePage";

function PersonaIInfor() {
  return (
    <div className="mt-3 w-full rounded-xl bg-dataTable  p-6 px-4">
      <header className="flex  items-center justify-between">
        <Typography variant="h6">Personal Information</Typography>
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
      <PersonalForm />
    </div>
  );
}
export default React.memo(PersonaIInfor);
