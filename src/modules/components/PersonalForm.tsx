import React, { useContext, useEffect, useMemo, useState } from "react";
import DatePick from "./DatePick";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import { genderType, marriageType } from "../../constants/type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { API_PATHS } from "../../configs/api";
import Cookies from "js-cookie";
import { employeeContext } from "../pages/CreateOrUpdatePage";
function PersonalForm() {
  const { marriageStatus } = useContext(employeeContext);
  const employeeForm = useSelector((state: RootState) => state.employee.employeeForm);
  const errorMessage = useSelector((state: RootState) => state.employee.errorMessage);
  const gender: genderType[] = useMemo(() => {
    return [
      {
        id: 0,
        name: "Male"
      },
      {
        id: 1,
        name: "Female"
      }
    ];
  }, []);

  return (
    <form className="flex justify-between px-3">
      <div className="leftForm flex w-48% flex-col">
        <InputForm
          arrow={true}
          label="Name"
          target="name"
          type="text"
          errorMessage={errorMessage.name}
          value={employeeForm.name}
          required="Name"
          length={50}
        />
        <SelectForm
          label="Gender"
          defaultValue="Choose Gender"
          errorMessage={String(errorMessage.gender)}
          required="Gender"
          target="gender"
          value={String(employeeForm.gender)}
          selectList={gender}
        />
        <InputForm
          arrow={true}
          label="Mother Name"
          target="mother_name"
          type="text"
          errorMessage={errorMessage.mother_name}
          value={employeeForm.mother_name}
          required=""
          length={50}
        />
        <DatePick label="Date of birth" value={employeeForm.dob} errorMessage={errorMessage.dob} target="dob" />
        <InputForm
          arrow={true}
          label="Place of birth"
          target="pob"
          type="text"
          errorMessage={errorMessage.pob}
          value={employeeForm.pob}
          required=""
          length={50}
        />
        <InputForm
          arrow={true}
          label="KTP No."
          target="ktp_no"
          type="number"
          errorMessage={errorMessage.ktp_no}
          value={employeeForm.ktp_no}
          required="KTP No"
          length={20}
        />
        <InputForm
          arrow={true}
          label="National Card ID"
          target="nc_id"
          type="number"
          errorMessage={errorMessage.nc_id}
          value={employeeForm.nc_id}
          required="National Card ID"
          length={20}
        />
        <InputForm
          arrow={true}
          label="Home Address 1"
          target="home_address_1"
          type="text"
          errorMessage={errorMessage.home_address_1}
          value={employeeForm.home_address_1}
          required=""
          length={100}
        />
        <InputForm
          arrow={true}
          label="Home Address 2"
          target="home_address_2"
          type="text"
          errorMessage={errorMessage.home_address_2}
          value={employeeForm.home_address_2}
          required=""
          length={100}
        />
      </div>

      <div className="rightForm flex w-48% flex-col">
        <InputForm
          arrow={true}
          label="Mobile No."
          target="mobile_no"
          type="number"
          errorMessage={errorMessage.mobile_no}
          value={employeeForm.mobile_no}
          required=""
          length={20}
        />
        <InputForm
          arrow={true}
          label="Tel No."
          target="tel_no"
          type="number"
          errorMessage={errorMessage.tel_no}
          value={employeeForm.tel_no}
          required=""
          length={20}
        />
        <SelectForm
          label="Marriage Status"
          defaultValue="Choose Marriage Status"
          errorMessage={errorMessage.marriage_id}
          required=""
          target="marriage_id"
          value={employeeForm.marriage_id}
          selectList={marriageStatus}
        />
        <InputForm
          arrow={true}
          label="Bank Card No."
          target="card_number"
          type="number"
          errorMessage={errorMessage.card_number}
          value={employeeForm.card_number}
          required=""
          length={30}
        />
        <InputForm
          arrow={true}
          label="Bank Account No."
          target="bank_account_no"
          type="number"
          errorMessage={errorMessage.bank_account_no}
          value={employeeForm.bank_account_no}
          required=""
          length={30}
        />
        <InputForm
          arrow={true}
          label="Bank Name"
          target="bank_name"
          type="text"
          errorMessage={errorMessage.bank_name}
          value={employeeForm.bank_name}
          required=""
          length={100}
        />
        <InputForm
          arrow={true}
          label="Family Card Number"
          target="family_card_number"
          type="number"
          errorMessage={errorMessage.family_card_number}
          value={employeeForm.family_card_number}
          required=""
          length={30}
        />
        <InputForm
          arrow={true}
          label="Safety Insurance No."
          target="safety_insurance_no"
          type="number"
          errorMessage={errorMessage.safety_insurance_no}
          value={employeeForm.safety_insurance_no}
          required=""
          length={30}
        />
        <InputForm
          arrow={true}
          label="Health Insurance No."
          target="health_insurance_no"
          type="number"
          errorMessage={errorMessage.health_insurance_no}
          value={employeeForm.health_insurance_no}
          required=""
          length={30}
        />
      </div>
    </form>
  );
}

export default React.memo(PersonalForm);
