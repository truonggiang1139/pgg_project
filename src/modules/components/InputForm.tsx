import React, { useContext } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { CustomTextField } from "../../CustomStyle/StyleInput";
import { personalContext } from "../pages/CreateOrUpdatePage";

type InputFormType = {
  label: string;
  type: string;
  value: string;
  target: string;
  errorMessage: string;
  required: string;
  length: number;
};
function InputForm({ label, type, value, errorMessage, required, length, target }: InputFormType) {
  const { handleChangeValuePersonalForm, validatePersonalForm } = useContext(personalContext);
  return (
    <div className="  mb-4 flex items-center justify-between">
      <label>
        {label}
        {!!required && <span className="text-xl text-red-500">*</span>}
      </label>
      <FormControl className="flex w-3/5 flex-col">
        <CustomTextField
          disableUnderline
          error={!!errorMessage}
          type={type}
          value={value}
          onChange={(e) => {
            handleChangeValuePersonalForm(e.target.value, target);
            validatePersonalForm(e.target.value, target, required, length);
          }}
          onBlur={() => validatePersonalForm(value, target, required, length)}
        />
        {!!errorMessage && <FormHelperText sx={{ color: "rgb(229, 72, 77)" }}>{errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default React.memo(InputForm);
