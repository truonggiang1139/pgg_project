import { Typography } from "@mui/material";
import React, { useEffect } from "react";

function PersonaIInfor() {
  useEffect(() => {
    return () => {
      console.log("first");
    };
  }, []);
  return (
    <div className="mt-3 h-screen w-full rounded-xl bg-dataTable  p-2 px-4">
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
    </div>
  );
}
export default React.memo(PersonaIInfor);
