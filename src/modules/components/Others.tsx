import { TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { employeeContext } from "../pages/CreateOrUpdatePage";
import { CustomAutoComplete } from "../../CustomStyle/StyleAutoComplete";
import { benefitType, gradeType } from "../../constants/type";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { changeEmployeeForm } from "../../redux/employeeSlice";

export default function Others() {
  const { grade, benefit } = useContext(employeeContext);
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const dispatch = useAppDispatch();
  return (
    <div className="mt-3 w-full rounded-xl bg-dataTable  p-6 px-4">
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
            className="flex w-3/5 flex-col"
            multiple
            disableCloseOnSelect
            disablePortal
            options={benefit}
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
      </div>
    </div>
  );
}
