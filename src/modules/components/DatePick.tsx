import React, { useState } from "react";
import "../../App.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iconCalendar from "../../assets/iconCalendar.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames";

type propsDatePick = {
  value: string;
  errorMessage: string;
  handleChangeDate: (value: string) => void;
  validateRequiredInput: (value: string | number, target: string) => void;
};
export default function DatePick(props: propsDatePick) {
  const { value, errorMessage, handleChangeDate, validateRequiredInput } = props;
  return (
    <div
      className={classNames(
        " relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input px-2 py-4 outline-none ",
        {
          "border border-red-300 bg-red-50": errorMessage
        }
      )}
    >
      <DatePicker
        selected={value ? new Date(value) : null}
        dateFormat="yyyy-MM-dd"
        className={classNames("  h-8 w-full bg-input px-8 pt-2 outline-none  ", {
          " bg-red-50": errorMessage
        })}
        isClearable
        onChange={(date: Date | null) => {
          const value = date !== null ? date.toISOString().slice(0, 10) : "";
          handleChangeDate(value);
        }}
        onBlur={() => validateRequiredInput(value, "Dob")}
      />
      <span className=" absolute left-3 top-4">
        <img src={iconCalendar} alt="" />
      </span>
      <span className="absolute right-3 top-4">
        <ExpandMoreIcon className="opacity-70" />
      </span>
    </div>
  );
}
