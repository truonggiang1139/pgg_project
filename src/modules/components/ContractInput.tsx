import React, { useState } from "react";
import "../../App.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as IconCalendar } from "../../assets/iconCalendar.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, FormControl, Typography } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import iconRemove from "../../assets/iconRemove.svg";
import classNames from "classnames";
import { CustomTextField } from "../../CustomStyle/StyleInput";
import { RootState, useAppDispatch } from "../../store";
import { addContractFile, changeEmployeeForm } from "../../redux/employeeSlice";
import { useSelector } from "react-redux";
import { contractsType } from "../../constants/type";
import moment from "moment";
import { useParams } from "react-router-dom";

type contractFileType = {
  file: File | null;
  contractDate: string;
  contractName: string;
};
export default function ContractInput() {
  const [contractFile, setContractFile] = useState<contractFileType>({
    file: null,
    contractDate: "",
    contractName: ""
  });
  const [errorMessage, setErrorMessage] = useState({
    contractDate: false,
    contractName: false,
    contractFile: false
  });
  const dispatch = useAppDispatch();
  const { idEmployee } = useParams();
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const checkInput = (target: string, value: string) => {
    if (!value) {
      setErrorMessage((prev) => ({ ...prev, [target]: true }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, [target]: false }));
  };
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setContractFile((prev) => ({ ...prev, file: selectedFile || null }));
    setErrorMessage((prev) => ({ ...prev, contractFile: false }));
  };
  const handleAddContract = () => {
    checkInput("contractDate", contractFile.contractDate);
    checkInput("contractName", contractFile.contractName);

    if (contractFile.contractDate && contractFile.contractName) {
      if (contractFile.file === null) {
        setErrorMessage((prev) => ({ ...prev, contractFile: true }));
      } else {
        setErrorMessage((prev) => ({ ...prev, contractFile: false }));
        const value: contractsType = {
          id: contractFile.file.lastModified,
          employee_id: idEmployee ?? "0",
          contract_date: moment(contractFile.contractDate).format("YYYY/MM/DD"),
          name: contractFile.contractName,
          document: "",
          created_at: "",
          updated_at: "",
          deleted_at: null
        };
        dispatch(changeEmployeeForm({ target: "contracts", value: [...employeeForm.contracts, value] }));
        dispatch(
          addContractFile({
            documents: [contractFile.file],
            names: [contractFile.contractName],
            contract_dates: [moment(contractFile.contractDate).format("YYYY-MM-DD")],
            modified_contracts: []
          })
        );
        setContractFile({
          file: null,
          contractDate: "",
          contractName: ""
        });
      }
    }
  };
  return (
    <div className="flex w-3/5  flex-col px-5">
      <div className=" mb-4 flex items-center justify-between">
        <label htmlFor="name">Contract Date</label>
        <div
          className={classNames(
            " relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input px-2 py-4 outline-none focus:bg-red-400 ",
            {
              "border border-red-300 bg-red-50": errorMessage.contractDate
            }
          )}
        >
          <DatePicker
            selected={contractFile.contractDate ? new Date(contractFile.contractDate) : null}
            dateFormat="yyyy/MM/dd"
            className={classNames("  h-8 w-full bg-input px-8 pt-2 outline-none  ", {
              " bg-red-50": errorMessage.contractDate
            })}
            isClearable
            onChange={(date: Date | null) => {
              const value = date !== null ? date.toISOString().slice(0, 10) : "";
              setContractFile((prev) => ({ ...prev, contractDate: value }));
              checkInput("contractDate", value);
            }}
          />
          <span className=" absolute left-3 top-4">
            <IconCalendar />
          </span>
          <span className="absolute right-3 top-4">
            <ExpandMoreIcon className="opacity-70" />
          </span>
        </div>
      </div>

      <div className="  mb-4 flex items-center justify-between">
        <label>Contract Name</label>
        <FormControl className="flex w-3/5 flex-col">
          <CustomTextField
            disableUnderline
            type="text"
            value={contractFile.contractName}
            error={errorMessage.contractName}
            onChange={(e) => {
              setContractFile((prev) => ({ ...prev, contractName: e.target.value }));
              checkInput("contractName", e.target.value);
            }}
          />
        </FormControl>
      </div>
      <div className="flex flex-wrap justify-between">
        <Box>
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
          {errorMessage.contractFile && (
            <Typography
              sx={{
                textAlign: "left",
                fontSize: "12px",
                color: "rgb(229, 72, 77)"
              }}
            >
              No file choosen
            </Typography>
          )}
        </Box>
        <Button
          onClick={handleAddContract}
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

      {contractFile.file && (
        <div className="flex justify-start">
          <div className="mt-3 inline-flex  min-w-100 items-center justify-between bg-total px-2 py-1 text-sm">
            <p>{contractFile.file.name}</p>
            <Button
              size="small"
              className=" min-w-fit"
              disableRipple
              disableTouchRipple
              onClick={() => {
                setContractFile((prev) => ({ ...prev, file: null }));
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
