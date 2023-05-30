import React, { useState } from "react";
import DatePick from "./DatePick";
import InputForm from "./InputForm";
import { Button } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import iconRemove from "../../assets/iconRemove.svg";
export default function ContractInput() {
  const [file, setFile] = useState<File | null>(null);
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile || null);
  };

  return (
    <div className="flex w-3/5  flex-col px-5">
      <DatePick label="Date of birth" value="" errorMessage="" target={""} />
      <InputForm label="Name" target="name" type="text" errorMessage="" value="" required="Name" length={50} />

      <div className="flex flex-wrap justify-between">
        <Button
          variant="contained"
          component="label"
          sx={{
            color: "rgb(0, 145, 255)",
            backgroundColor: "rgb(237, 246, 255)",
            border: "1px dashed",
            width: "48%",
            marginBottom: "12px",
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
      </div>

      {file && (
        <div className="flex justify-start">
          <div className="mt-3 inline-flex  min-w-100 items-center justify-between bg-total px-2 py-1 text-sm">
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
          </div>
        </div>
      )}
    </div>
  );
}
