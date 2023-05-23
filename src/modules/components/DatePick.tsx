import React, { useState } from "react";
import "../../App.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iconCalendar from "../../assets/iconCalendar.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DatePick() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="relative  flex h-12 w-3/5 flex-row items-center rounded-md bg-input px-2 py-4 outline-none">
      <DatePicker
        selected={selectedDate}
        onChange={(date: any) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        className="h-8 w-full bg-input px-8 pt-2 outline-none"
        isClearable
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
