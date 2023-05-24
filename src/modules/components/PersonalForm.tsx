import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomInputSelect, { customPaperProps } from "../auth/components/StyleSelect";
import axios from "axios";
import Cookies from "js-cookie";
import DatePick from "./DatePick";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { personalFormType } from "../../constants/type";
import classNames from "classnames";
import CustomInput from "./CustomInput";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { putPersonalForm } from "../../redux/employeeSlice";
type PersonalFormType = {
  form: personalFormType;
  value: string;
};

export default function PersonaIInfor(props: PersonalFormType) {
  console.log(props.form);

  return <div></div>;
}
/*{
  const [marriageStatus, setMarriageStatus] = useState([]);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState({
    errorName: "",
    errorGender: "",
    errorDob: "",
    errorKtp_no: "",
    errorCard_number: ""
  });
  const motherNameRef = useRef<HTMLInputElement | null>(null);
  const pobRef = useRef<HTMLInputElement | null>(null);
  const address1Ref = useRef<HTMLInputElement | null>(null);
  const address2Ref = useRef<HTMLInputElement | null>(null);
  const mobileRef = useRef<HTMLInputElement | null>(null);
  const telRef = useRef<HTMLInputElement | null>(null);
  const bankCardRef = useRef<HTMLInputElement | null>(null);
  const bankAccRef = useRef<HTMLInputElement | null>(null);
  const bankNameRef = useRef<HTMLInputElement | null>(null);
  const familyCardRef = useRef<HTMLInputElement | null>(null);
  const safeInsRef = useRef<HTMLInputElement | null>(null);
  const healthInsRef = useRef<HTMLInputElement | null>(null);
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
  useLayoutEffect(() => {
    const motherNameInput = motherNameRef.current;
    const pobInput = pobRef.current;
    const address1Input = address1Ref.current;
    const address2Input = address2Ref.current;
    const mobileInput = mobileRef.current;
    const teleInput = telRef.current;
    const bankCardInput = bankCardRef.current;
    const bankAccInput = bankAccRef.current;
    const bankNameInput = bankNameRef.current;
    const familyCardInput = familyCardRef.current;
    const safeInsInput = safeInsRef.current;
    const healthInsInput = healthInsRef.current;
    return () => {
      if (
        motherNameInput &&
        pobInput &&
        address1Input &&
        address2Input &&
        mobileInput &&
        teleInput &&
        bankCardInput &&
        bankAccInput &&
        bankNameInput &&
        familyCardInput &&
        safeInsInput &&
        healthInsInput
      ) {
        dispatch(
          putPersonalForm({
            ...personalForm,
            mother_name: motherNameInput.value,
            pob: pobInput.value,
            home_address_1: address1Input.value,
            home_address_2: address2Input.value,
            mobile_no: Number(mobileInput.value),
            tel_no: Number(teleInput.value),
            card_number: bankCardInput.value,
            bank_account_no: Number(bankAccInput.value),
            bank_name: bankNameInput.value,
            family_card_number: Number(familyCardInput.value),
            safety_insurance_no: Number(safeInsInput.value),
            health_insurance_no: Number(healthInsInput.value)
          })
        );
      }
    };
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
                validateRequiredInput(e.target.value, "Gender");
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
          <input
            ref={motherNameRef}
            type="text"
            className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
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
          <input
            ref={pobRef}
            type="text"
            className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
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
          <input
            ref={address1Ref}
            type="text"
            className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Home Address 2</label>
          <input
            ref={address2Ref}
            type="text"
            className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
      </div>

      <div className="rightForm flex w-48% flex-col">
        <div className="  mb-4 flex items-center justify-between">
          <label htmlFor="name" className="">
            Mobile No.
          </label>
          <div className="flex w-3/5 flex-col">
            <input
              ref={mobileRef}
              type="number"
              className="numeric-input  h-12 rounded-md bg-input px-2 py-4  outline-none"
            />
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label className="text-left  ">Tel No.</label>
          <div className="flex w-3/5 flex-col">
            <input
              ref={telRef}
              type="number"
              className="numeric-input h-12  rounded-md bg-input px-2 py-4 outline-none"
            />
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
          <input
            ref={bankCardRef}
            type="number"
            className="numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Bank Account No.</label>
          <input
            ref={bankAccRef}
            type="number"
            className="numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Bank Name</label>
          <input
            ref={bankNameRef}
            type="text"
            className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Family Card Number</label>
          <input
            ref={familyCardRef}
            type="number"
            className="numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Safety Insurance No.</label>
          <input
            ref={safeInsRef}
            type="number"
            className=" numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Health Insurance No.</label>
          <input
            ref={healthInsRef}
            type="number"
            className=" numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
      </div>
    </form>
  );
}
*/
