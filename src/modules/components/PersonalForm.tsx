import { MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import CustomInputSelect, { customPaperProps } from "../auth/components/StyleSelect";
import DatePick from "./DatePick";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames";
import { personalContext } from "../pages/CreateOrUpdatePage";

function PersonalForm() {
  const { marriageStatus, personalForm, errorMessage, validatePersonalForm, handleChangeValuePersonalForm } =
    useContext(personalContext);

  return (
    <form className="flex justify-between px-3">
      <div className="leftForm flex w-48% flex-col">
        <div className="  mb-4 flex items-center justify-between">
          <label htmlFor="name" className="">
            Name
            <span className="text-xl text-red-500">*</span>
          </label>
          <div className="flex w-3/5 flex-col">
            <input
              type={"text"}
              className={classNames("  h-12 rounded-md bg-input px-2 py-4 outline-none  ", {
                "border border-red-300 bg-red-50": !!errorMessage.name
              })}
              value={personalForm.name}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "name");
                validatePersonalForm(e.target.value, "name");
              }}
              onBlur={() => validatePersonalForm(personalForm.name, "name")}
            />
            {!!errorMessage.name && <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.name}</small>}
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label className="text-left  ">
            Gender<span className="text-xl text-red-500">*</span>
          </label>
          <div className="flex w-3/5 flex-col">
            <Select
              defaultValue=""
              className={classNames("h-12  rounded-md bg-input px-2 py-4 outline-none", {
                "border border-red-300 bg-red-50": !!errorMessage.gender
              })}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "gender");
                validatePersonalForm(e.target.value, "gender");
              }}
              onBlur={() => validatePersonalForm(personalForm.gender, "gender")}
              displayEmpty
              value={personalForm.gender}
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
            {errorMessage.gender && <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.gender}</small>}
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="mother name">Mother Name</label>
          <div className="flex w-3/5 flex-col">
            <input
              value={personalForm.mother_name}
              type="text"
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "mother_name");
                validatePersonalForm(e.target.value, "mother_name");
              }}
              onBlur={() => validatePersonalForm(personalForm.mother_name, "mother_name")}
              className={classNames("h-12  rounded-md bg-input px-2 py-4 outline-none", {
                "border border-red-300 bg-red-50": !!errorMessage.mother_name
              })}
            />
            {errorMessage.mother_name && (
              <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.mother_name}</small>
            )}
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">
            Date of birth<span className="text-xl text-red-500">*</span>
          </label>
          <DatePick value={personalForm.dob} />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="place of birth">Place of birth</label>
          <div className="flex w-3/5 flex-col">
            <input
              value={personalForm.pob}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "pob");
                validatePersonalForm(e.target.value, "pob");
              }}
              onBlur={() => validatePersonalForm(personalForm.pob, "pob")}
              type="text"
              className={classNames("h-12  rounded-md bg-input px-2 py-4 outline-none", {
                "border border-red-300 bg-red-50": !!errorMessage.pob
              })}
            />
            {errorMessage.pob && <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.pob}</small>}
          </div>
        </div>
        <div className="  mb-4 flex items-center justify-between">
          <label htmlFor="name" className="">
            KTP No.
            <span className="text-xl text-red-500">*</span>
          </label>
          <div className="flex w-3/5 flex-col">
            <input
              type="number"
              className={classNames("numeric-input  h-12 rounded-md bg-input px-2 py-4 outline-none  ", {
                "border border-red-300 bg-red-50": !!errorMessage.ktp_no
              })}
              value={personalForm.ktp_no}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "ktp_no");
                validatePersonalForm(e.target.value, "ktp_no");
              }}
              onBlur={() => validatePersonalForm(personalForm.ktp_no, "ktp_no")}
            />
            {errorMessage.ktp_no && <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.ktp_no}</small>}
          </div>
        </div>
        <div className="  mb-4 flex items-center justify-between">
          <label htmlFor="National Card ID" className="">
            National Card ID<span className="text-xl text-red-500">*</span>
          </label>
          <div className="flex w-3/5 flex-col">
            <input
              type="number"
              className={classNames("numeric-input  h-12 rounded-md bg-input px-2 py-4 outline-none  ", {
                "border border-red-300 bg-red-50": !!errorMessage.nc_id
              })}
              value={personalForm.nc_id}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "nc_id");
                validatePersonalForm(e.target.value, "nc_id");
              }}
              onBlur={() => validatePersonalForm(personalForm.nc_id, "nc_id")}
            />
            {errorMessage.nc_id && <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.nc_id}</small>}
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="address 1">Home Address 1</label>
          <div className="flex w-3/5 flex-col">
            <input
              value={personalForm.home_address_1}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "home_address_1");
                validatePersonalForm(e.target.value, "home_address_1");
              }}
              onBlur={() => validatePersonalForm(personalForm.home_address_1, "home_address_1")}
              type="text"
              className={classNames("numeric-input  h-12 rounded-md bg-input px-2 py-4 outline-none  ", {
                "border border-red-300 bg-red-50": !!errorMessage.home_address_1
              })}
            />
            {errorMessage.home_address_1 && (
              <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.home_address_1}</small>
            )}
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="address 2">Home Address 2</label>
          <div className="flex w-3/5 flex-col">
            <input
              value={personalForm.home_address_2}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "home_address_2");
                validatePersonalForm(e.target.value, "home_address_2");
              }}
              onBlur={() => validatePersonalForm(personalForm.home_address_2, "home_address_2")}
              type="text"
              className={classNames("numeric-input  h-12 rounded-md bg-input px-2 py-4 outline-none  ", {
                "border border-red-300 bg-red-50": !!errorMessage.home_address_2
              })}
            />
            {errorMessage.home_address_2 && (
              <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.home_address_2}</small>
            )}
          </div>
        </div>
      </div>

      <div className="rightForm flex w-48% flex-col">
        <div className="  mb-4 flex items-center justify-between">
          <label htmlFor="address 2">Mobile No.</label>
          <div className="flex w-3/5 flex-col">
            <input
              value={personalForm.mobile_no}
              onChange={(e) => {
                handleChangeValuePersonalForm(e, "mobile_no");
                validatePersonalForm(e.target.value, "mobile_no");
              }}
              onBlur={() => validatePersonalForm(personalForm.mobile_no, "mobile_no")}
              type="number"
              className={classNames("numeric-input  h-12 rounded-md bg-input px-2 py-4 outline-none  ", {
                "border border-red-300 bg-red-50": !!errorMessage.mobile_no
              })}
            />
            {errorMessage.mobile_no && (
              <small className="pl-3 pt-2 text-left text-red-600">{errorMessage.mobile_no}</small>
            )}
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label className="text-left  ">Tel No.</label>
          <div className="flex w-3/5 flex-col">
            <input
              value={personalForm.tel_no}
              type="number"
              className="numeric-input h-12  rounded-md bg-input px-2 py-4 outline-none"
            />
          </div>
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="marriage">Marriage Status</label>
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
          <label htmlFor="bank card no">Bank Card No.</label>
          <input
            value={personalForm.card_number}
            type="number"
            className="numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="bank account">Bank Account No.</label>
          <input
            value={personalForm.bank_account_no}
            type="number"
            className="numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="bank name">Bank Name</label>
          <input
            value={personalForm.bank_name}
            type="text"
            className="flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Family Card Number</label>
          <input
            value={personalForm.family_card_number}
            type="number"
            className="numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Safety Insurance No.</label>
          <input
            value={personalForm.safety_insurance_no}
            type="number"
            className=" numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
        <div className=" mb-4 flex items-center justify-between">
          <label htmlFor="name">Health Insurance No.</label>
          <input
            value={personalForm.health_insurance_no}
            type="number"
            className=" numeric-input flex  h-12 w-3/5 flex-col rounded-md bg-input px-2 py-4 outline-none"
          />
        </div>
      </div>
    </form>
  );
}

export default React.memo(PersonalForm);
