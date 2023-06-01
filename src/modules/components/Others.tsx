import { Button, Select, TextField, Typography, styled } from "@mui/material";
import React, { useContext, useState } from "react";
import { employeeContext } from "../pages/CreateOrUpdatePage";
import { CustomAutoComplete } from "../../CustomStyle/StyleAutoComplete";
import { benefitType, documentType, gradeType } from "../../constants/type";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { addDocumentFile, changeEmployeeForm } from "../../redux/employeeSlice";
import CustomInputSelect, { customPaperProps } from "../auth/components/StyleSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TableDocument from "./TableDocument";
import moment from "moment";
const TextAreaStyle = styled("textarea")(({}) => ({
  width: "100%",
  flexGrow: 1,
  boxSizing: "border-box",
  borderRadius: 8,
  minWidth: 308,
  backgroundColor: "#f1f3f5",
  resize: "none",
  marginBottom: "8px",
  padding: 16,

  "&:focus": {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    border: "none",
    outline: "none"
  }
}));
export default function Others() {
  const { grade, benefit } = useContext(employeeContext);
  const [benefitList, setBenefitList] = useState<benefitType[]>([]);
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const dispatch = useAppDispatch();
  const handleChangeBenefits = (event: React.SyntheticEvent<Element, Event>, value: unknown) => {
    setBenefitList((prev) => (prev = value as benefitType[]));
    const benefitList = (value as benefitType[]).map((item) => item.id);
    dispatch(changeEmployeeForm({ target: "benefits", value: benefitList }));
  };
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const newValue: documentType = {
        id: 100,
        employee_id: 100,
        created_at: moment(selectedFile.lastModified).format("YYYY-MM-DD"),
        document: selectedFile.name,
        updated_at: null
      };
      dispatch(addDocumentFile({ employee_id: 1, documents: [selectedFile] }));
      dispatch(changeEmployeeForm({ target: "documents", value: [newValue, ...employeeForm.documents] }));
    }
  };
  return (
    <div className="mt-3 w-full rounded-xl bg-dataTable  p-6">
      <header className="flex  items-center justify-between">
        <Typography className="font-semibold" variant="h6">
          Others
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
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="grade" className="w-2/5 text-left">
            Grade
          </label>
          <CustomAutoComplete
            className=" w-3/5 flex-col"
            disablePortal
            value={employeeForm.grade}
            onChange={(e, value) => {
              dispatch(changeEmployeeForm({ target: "grade", value: value !== null ? (value as gradeType) : null }));
              dispatch(
                changeEmployeeForm({ target: "grade_id", value: value !== null ? (value as gradeType).id : null })
              );
            }}
            options={grade}
            getOptionLabel={(option) => (option as gradeType).name}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        {!!employeeForm.grade?.benefits.length && (
          <div className=" mb-4 flex items-center justify-between">
            <div className="w-2/5"></div>
            <div className="flex w-3/5 flex-row flex-wrap">
              {employeeForm.grade?.benefits.map((item) => (
                <div className="mx-1 mb-1 flex h-6 items-center rounded-md bg-benefitItem px-2 text-xs text-gray">
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="grade">Benefit</label>
          <CustomAutoComplete
            sx={{}}
            className="flex w-3/5 flex-col"
            multiple
            disableCloseOnSelect
            disablePortal
            options={benefit}
            value={benefitList}
            onChange={handleChangeBenefits}
            getOptionLabel={(option) => (option as benefitType).name}
            renderInput={(params) => (
              <TextField
                sx={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  marginTop: "5px"
                }}
                {...params}
              />
            )}
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="" className="w-2/5 text-left">
            Remark
          </label>
          <TextAreaStyle
            name="remark"
            className="w-3/5"
            value={employeeForm.remark}
            onChange={(e) => dispatch(changeEmployeeForm({ target: "remark", value: e.target.value }))}
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="" className="w-2/5 text-left">
            HRM User Account
          </label>
          <Select
            disabled
            sx={{
              width: "60%",
              "&.Mui-disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)"
              }
            }}
            defaultValue=""
            IconComponent={ExpandMoreIcon}
            input={<CustomInputSelect />}
            MenuProps={{
              PaperProps: customPaperProps
            }}
          ></Select>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-md border border-formContract ">
        <header className="my-5 ml-6 flex w-1/2 flex-row items-center ">
          <div className="w-2/5 text-left">Document</div>
          <Button
            variant="contained"
            component="label"
            sx={{
              color: "rgb(0, 145, 255)",
              backgroundColor: "rgb(237, 246, 255)",
              border: "1px dashed",
              width: "100px",
              boxShadow: "none",
              borderRadius: "6px",
              height: "32px",
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "rgba(0, 145, 255, 0.08)"
              }
            }}
          >
            <FileUploadOutlinedIcon />
            Upload
            <input type="file" accept="image/*,.pdf,.csv,.xlsx,.docx" hidden onChange={handleUploadFile} />
          </Button>
        </header>
        <TableDocument />
      </div>
    </div>
  );
}
