import React, { useContext, useState } from "react";
import "../../App.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iconCalendar from "../../assets/iconCalendar.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames";
import { SelectChangeEvent } from "@mui/material";
import { personalContext } from "../pages/CreateOrUpdatePage";

type propsDatePick = {
  value: string;
};
export default function DatePick(props: propsDatePick) {
  const { value } = props;
  const { handleChangeValuePersonalForm, validatePersonalForm, errorMessage } = useContext(personalContext);
  return (
    <div
      className={classNames(
        " relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input px-2 py-4 outline-none ",
        {
          "border border-red-300 bg-red-50": errorMessage.dob
        }
      )}
    >
      <DatePicker
        selected={value ? new Date(value) : null}
        dateFormat="yyyy-MM-dd"
        className={classNames("  h-8 w-full bg-input px-8 pt-2 outline-none  ", {
          " bg-red-50": errorMessage.dob
        })}
        isClearable
        onChange={(date: Date | null) => {
          const value = date !== null ? date.toISOString().slice(0, 10) : "";
          handleChangeValuePersonalForm(value, "dob");
          validatePersonalForm(value, "dob");
        }}
        onBlur={() => validatePersonalForm(value, "dob")}
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
