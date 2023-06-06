import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { genderType, marriageType } from "../../constants/type";
import { changeEmployeeForm, validateEmployeeForm } from "../../redux/employeeSlice";
import { useAppDispatch } from "../../store";
import CustomInputSelect, { customPaperProps } from "../auth/components/StyleSelect";
type SelectFormType = {
  label: string;
  value: string;
  selectList: marriageType[] | genderType[];
  defaultValue: string;
  target: string;
  errorMessage: string;
  required: string;
};
function SelectForm({ label, value, defaultValue, target, errorMessage, required, selectList }: SelectFormType) {
  const dispatch = useAppDispatch();
  const { idEmployee } = useParams();
  return (
    <div className=" mb-4 flex items-center justify-between">
      <label className="text-left  ">
        {label}
        {!!required && <span className="text-xl text-red-500">*</span>}
      </label>
      <div className="flex w-3/5 flex-col">
        <Select
          disabled={target === "type" && !!idEmployee}
          value={value}
          defaultValue=""
          onChange={(e) => {
            dispatch(changeEmployeeForm({ target, value: e.target.value }));
            dispatch(validateEmployeeForm({ target, value: e.target.value, required, length: 100 }));
          }}
          onBlur={() => dispatch(validateEmployeeForm({ target, value, required, length: 100 }))}
          displayEmpty
          IconComponent={ExpandMoreIcon}
          error={!!errorMessage}
          input={<CustomInputSelect />}
          MenuProps={{
            PaperProps: customPaperProps
          }}
        >
          {defaultValue === "Choose Marriage Status" && <MenuItem value="">NA</MenuItem>}
          <MenuItem sx={{ display: "none" }} value="">
            {defaultValue}
          </MenuItem>

          {selectList.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {!!errorMessage && <FormHelperText sx={{ color: "rgb(229, 72, 77)" }}>{errorMessage}</FormHelperText>}
      </div>
    </div>
  );
}

export default React.memo(SelectForm);
