import React from "react";
import "../../App.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iconCalendar from "../../assets/iconCalendar.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames";
import { useAppDispatch } from "../../store";
import { changeEmployeeForm, validateEmployeeForm } from "../../redux/employeeSlice";

type propsDatePick = {
  label: string;
  value: string;
  target: string;
  errorMessage: string;
};
function DatePick({ target, value, errorMessage, label }: propsDatePick) {
  const dispatch = useAppDispatch();
  return (
    <div className=" mb-4 flex items-center justify-between">
      <label htmlFor="name">
        {label}
        <span className="text-xl text-red-500">*</span>
      </label>
      <div
        className={classNames(
          " relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input px-2 py-4 outline-none focus:bg-red-400 ",
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
            console.log(value);

            dispatch(changeEmployeeForm({ target, value }));
            dispatch(validateEmployeeForm({ target, value, required: "required", length: 100 }));
          }}
          onBlur={() => dispatch(validateEmployeeForm({ target, value, required: "required", length: 100 }))}
        />
        <span className=" absolute left-3 top-4">
          <img src={iconCalendar} alt="" />
        </span>
        <span className="absolute right-3 top-4">
          <ExpandMoreIcon className="opacity-70" />
        </span>
      </div>
    </div>
  );
}
export default React.memo(DatePick);
