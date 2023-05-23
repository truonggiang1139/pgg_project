import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomInputSelect, { customPaperProps } from "../auth/components/StyleSelect";
import axios from "axios";
import Cookies from "js-cookie";
import DatePick from "./DatePick";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { personalFormType } from "../../constants/type";
import classNames from "classnames";
import CustomInput from "./CustomInput";
export default function PersonalForm() {
  const [marriageStatus, setMarriageStatus] = useState([]);
  const [personalForm, setPersonalForm] = useState<personalFormType>({
    name: "",
    gender: "",
    mother_name: "",
    dob: "",
    pob: "",
    ktp_no: "",
    nc_id: 0,
    home_address_1: "",
    home_address_2: "",
    mobile_no: 0,
    tel_no: 0,
    marriage_id: 0,
    card_number: "",
    bank_account_no: 0,
    bank_name: "",
    family_card_number: 0,
    safety_insurance_no: 0,
    health_insurance_no: 0
  });
  const [errorMessage, setErrorMessage] = useState({
    errorName: "",
    errorGender: "",
    errorDob: "",
    errorKtp_no: "",
    errorCard_number: ""
  });
  const motherNameref = useRef(null);

  const getDataMarriage = async () => {
    const res = await axios.get("https://api-training.hrm.div4.pgtest.co/api/v1/marriage", {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });
    setMarriageStatus(res.data.data);
  };
  const handleChangeDate = (value: string) => {
    setPersonalForm({ ...personalForm, dob: value });
    validateRequiredInput(value, "Dob");
  };
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setPersonalForm({ ...personalForm, [value]: e.target.value });
    validateRequiredInput(e.target.value, value.charAt(0).toUpperCase() + value.slice(1));
  };
  const validateRequiredInput = (value: string | number, target: string) => {
    if (!value) {
      setErrorMessage({ ...errorMessage, [`error${target}`]: `Please input ${target}` });
    } else if (typeof value === "string" ? value.length > 50 : value > 20) {
      setErrorMessage({
        ...errorMessage,
        [`error${target}`]:
          typeof value === "string" ? "Maximum length is 50 characters" : "Maximum length is 20 characters"
      });
    } else {
      setErrorMessage({ ...errorMessage, [`error${target}`]: "" });
    }
  };

  useEffect(() => {
    getDataMarriage();
  }, []);
  return (
    <form className="flex justify-between px-3">
      <div className="leftForm flex w-48% flex-col">
        <CustomInput
          label="Name"
          name="name"
          type="text"
          value={personalForm.name}
          errorMessage={errorMessage.errorName}
          handleChangeValue={handleChangeValue}
          validateRequiredInput={validateRequiredInput}
        />
        <div className=" mb-4 flex items-center justify-between">
          <label className="text-left  ">
            Gender<span className="text-xl text-red-500">*</span>
          </label>
          <div className="flex w-3/5 flex-col">
            <Select
              defaultValue=""
              className={classNames("h-12  rounded-md bg-input px-2 py-4 outline-none", {
                "border border-red-300 bg-red-50": !!errorMessage.errorGender
              })}
              displayEmpty
              value={personalForm.gender}
              onChange={(e) => {
                setPersonalForm({ ...personalForm, gender: e.target.value });
                validateRequiredInput(personalForm.gender, "Gender");
              }}
              onBlur={() => validateRequiredInput(personalForm.gender, "Gender")}
              IconComponent={ExpandMoreIcon}
              input={<CustomInputSelect />}
              MenuProps={{
                PaperProps: customPaperProps
              }}
            >
              <MenuItem hidden value="">
                Choose Gender
              </MenuItem>
              <MenuItem value="0">Male</MenuItem>
              <MenuItem value="1">Female</MenuItem>
            </Select>
            {errorMessage.errorGender && (
              <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.errorGender}</small>
            )}
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Mother Name</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">
            Date of birth<span className="text-xl text-red-500">*</span>
          </label>
          <DatePick
            value={personalForm.dob}
            errorMessage={errorMessage.errorDob}
            handleChangeDate={handleChangeDate}
            validateRequiredInput={validateRequiredInput}
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Place of birth</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <CustomInput
          label="KTP No."
          name="ktp_no"
          type="number"
          value={personalForm.ktp_no}
          errorMessage={errorMessage.errorKtp_no}
          handleChangeValue={handleChangeValue}
          validateRequiredInput={validateRequiredInput}
        />
        <CustomInput
          label="National Card ID"
          name="card_number"
          type="number"
          value={personalForm.card_number}
          errorMessage={errorMessage.errorCard_number}
          handleChangeValue={handleChangeValue}
          validateRequiredInput={validateRequiredInput}
        />
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Home Address 1</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Home Address 2</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
      </div>

      <div className="rightForm flex w-48% flex-col">
        <div className="  mb-4 flex items-center justify-between">
          <label htmlFor="name" className="">
            Mobile No.
          </label>
          <div className="flex w-3/5 flex-col">
            <input type="number" className="numeric-input  h-12 rounded-md bg-input px-2 py-4  outline-none" />
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label className="text-left  ">Tel No.</label>
          <div className="flex w-3/5 flex-col">
            <input type="number" className="numeric-input h-12  rounded-md bg-input px-2 py-4 outline-none" />
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Marriage Status</label>
          <div className="flex w-3/5 flex-col">
            <Select
              defaultValue=""
              className="h-12  rounded-md bg-input px-2 py-4 outline-none"
              displayEmpty
              IconComponent={ExpandMoreIcon}
              input={<CustomInputSelect />}
              MenuProps={{
                PaperProps: customPaperProps
              }}
            >
              <MenuItem value="">N/A</MenuItem>
              <MenuItem hidden value="">
                Choose Marriage
              </MenuItem>

              {marriageStatus.map((item: any) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Bank Card No.</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Bank Account No.</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Bank Name</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Family Card Number</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Safety Insurance No.</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Health Insurance No.</label>
          <input type="text" className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none" />
        </div>
      </div>
    </form>
  );
}
