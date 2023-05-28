import React from "react";

export default function ContractForm() {
  return (
    <form className="h-300 w-full rounded-md border border-formContract">
      <header className=" bg-headerContractForm px-5 py-1 text-left text-xs font-bold text-gray">CONTRACT:</header>
      <div className="px-5 py-2 text-left text-sm text-gray">Please upload pdf, png, xlsx, docx file format!</div>
      <hr
        style={{
          margin: "10px 0px",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)"
        }}
      />
      <div></div>
    </form>
  );
}
