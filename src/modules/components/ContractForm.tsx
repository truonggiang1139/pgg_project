import React, { useState } from "react";
import DatePick from "./DatePick";
import InputForm from "./InputForm";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import iconRemove from "../../assets/iconRemove.svg";
import ContractTable from "./ContractTable";
export default function ContractForm() {
  const [file, setFile] = useState<File | null>(null);
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile || null);
  };
  return (
    <form className="w-full rounded-md border border-formContract py-7">
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
      <div className="flex w-full ">
        <div className="flex w-3/5 flex-col px-5">
          <DatePick label="Date of birth" value="" errorMessage="" />
          <InputForm label="Name" target="name" type="text" errorMessage="" value="" required="Name" length={50} />

          <Button
            variant="contained"
            component="label"
            sx={{
              color: "rgb(0, 145, 255)",
              backgroundColor: "rgb(237, 246, 255)",
              border: "1px dashed",
              width: "48%",
              boxShadow: "none",
              minWidth: "195px",
              borderRadius: "6px",
              height: "48px",
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "rgba(0, 145, 255, 0.08)"
              }
            }}
          >
            <FileUploadOutlinedIcon />
            Upload File
            <input type="file" accept="image/*,.pdf,.csv,.xlsx,.docx" hidden onChange={handleUploadFile} />
          </Button>
          <Button
            variant="contained"
            component="label"
            sx={{
              color: "#fff",
              backgroundColor: "rgb(105, 217, 193)",
              marginTop: "12px",
              width: "48%",
              boxShadow: "none",
              minWidth: "195px",
              height: "48px",
              textTransform: "none",
              borderRadius: "6px",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "rgb(54, 215, 180)"
              }
            }}
          >
            Add
          </Button>

          {file && (
            <Box>
              <Box className="mt-3 flex  min-w-175 items-center justify-between bg-total px-2 py-1 text-sm">
                <p>{file.name}</p>
                <Button
                  size="small"
                  className=" min-w-fit"
                  disableRipple
                  disableTouchRipple
                  onClick={() => {
                    setFile(null);
                  }}
                  sx={{
                    ":hover": {
                      bgcolor: "rgba(215, 219, 223, 0.08)"
                    },
                    ":focus": {
                      outline: "none"
                    }
                  }}
                >
                  <img src={iconRemove} alt="" />
                </Button>
              </Box>
            </Box>
          )}
        </div>
        <hr
          style={{
            display: "block",
            margin: "0px",
            flexShrink: "0",
            borderWidth: "0px thin 0px 0px",
            borderStyle: "solid",
            borderColor: "rgba(193, 200, 205, 0.24)",
            height: "auto",
            alignSelf: "stretch"
          }}
        />
        <ContractTable />
      </div>
    </form>
  );
}
