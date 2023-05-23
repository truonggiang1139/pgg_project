import classNames from "classnames";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type PropsInput = {
  label: string;
  value: string | number;
  name: string;
  errorMessage: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  validateRequiredInput: (value: string | number, target: string) => void;
  handleInputChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | null;
};
export default function CustomInput(props: PropsInput) {
  const { label, name, value, handleChangeValue, validateRequiredInput, errorMessage, handleInputChange } = props;

  return (
    <div className="  mb-4 flex items-center justify-between">
      <label htmlFor="name" className="">
        {label}
        <span className="text-xl text-red-500">*</span>
      </label>
      <div className="flex w-3/5 flex-col">
        <input
          type="number"
          className={classNames("h-12  rounded-md bg-input px-2 py-4 outline-none", {
            "border border-red-300 bg-red-50": !!errorMessage
          })}
          value={value}
          onChange={(e) => handleChangeValue(e, name)}
          onBlur={() => validateRequiredInput(value, name.charAt(0).toUpperCase() + name.slice(1))}
          onInput={handleInputChange || undefined}
        />
        {errorMessage && <small className="pl-3 pt-2 text-left text-red-600">{errorMessage}</small>}
      </div>
    </div>
  );
}
