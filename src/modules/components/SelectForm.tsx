import { FormHelperText, MenuItem, Select } from "@mui/material";
import classNames from "classnames";
import React, { useContext } from "react";
import { personalContext } from "../pages/CreateOrUpdatePage";
import CustomInputSelect, { customPaperProps } from "../auth/components/StyleSelect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { genderType, marriageType } from "../../constants/type";
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
  const { handleChangeValuePersonalForm, validatePersonalForm } = useContext(personalContext);

  return (
    <div className=" mb-4 flex items-center justify-between">
      <label className="text-left  ">
        {label}
        {!!required && <span className="text-xl text-red-500">*</span>}
      </label>
      <div className="flex w-3/5 flex-col">
        <Select
          value={value}
          defaultValue=""
          onChange={(e) => {
            handleChangeValuePersonalForm(e.target.value, target);
            validatePersonalForm(e.target.value, target, required, 50);
          }}
          onBlur={() => validatePersonalForm(value, target, required, 50)}
          displayEmpty
          IconComponent={ExpandMoreIcon}
          error={!!errorMessage}
          input={<CustomInputSelect />}
          MenuProps={{
            PaperProps: customPaperProps
          }}
        >
          {defaultValue === "Choose Marriage Status" && <MenuItem value="">NA</MenuItem>}
          <MenuItem hidden value="">
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
