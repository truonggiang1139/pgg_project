import { MenuItem, Select } from "@mui/material";
import React, { useContext, useMemo } from "react";
import CustomInputSelect, { customPaperProps } from "../auth/components/StyleSelect";
import DatePick from "./DatePick";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames";
import { personalContext } from "../pages/CreateOrUpdatePage";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import { genderType } from "../../constants/type";

function PersonalForm() {
  const { marriageStatus, personalForm, errorMessage } = useContext(personalContext);
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
          label="Name"
          target="name"
          type="text"
          errorMessage={errorMessage.name}
          value={personalForm.name}
          required="Name"
          length={50}
        />
        <SelectForm
          label="Gender"
          defaultValue="Choose Gender"
          errorMessage={errorMessage.gender}
          required="Gender"
          target="gender"
          value={personalForm.gender}
          selectList={gender}
        />
        <InputForm
          label="Mother Name"
          target="mother_name"
          type="text"
          errorMessage={errorMessage.mother_name}
          value={personalForm.mother_name}
          required=""
          length={50}
        />
        <DatePick value={personalForm.dob} errorMessage={errorMessage.dob} />
        <InputForm
          label="Place of birth"
          target="pob"
          type="text"
          errorMessage={errorMessage.pob}
          value={personalForm.pob}
          required=""
          length={50}
        />
        <InputForm
          label="KTP No."
          target="ktp_no"
          type="number"
          errorMessage={errorMessage.ktp_no}
          value={personalForm.ktp_no}
          required="KTP No"
          length={20}
        />
        <InputForm
          label="National Card ID"
          target="nc_id"
          type="number"
          errorMessage={errorMessage.nc_id}
          value={personalForm.nc_id}
          required="National Card ID"
          length={20}
        />
        <InputForm
          label="Home Address 1"
          target="home_address_1"
          type="text"
          errorMessage={errorMessage.home_address_1}
          value={personalForm.home_address_1}
          required=""
          length={100}
        />
        <InputForm
          label="Home Address 2"
          target="home_address_2"
          type="text"
          errorMessage={errorMessage.home_address_2}
          value={personalForm.home_address_2}
          required=""
          length={100}
        />
      </div>

      <div className="rightForm flex w-48% flex-col">
        <InputForm
          label="Mobile No."
          target="mobile_no"
          type="number"
          errorMessage={errorMessage.mobile_no}
          value={personalForm.mobile_no}
          required=""
          length={20}
        />
        <InputForm
          label="Tel No."
          target="tel_no"
          type="number"
          errorMessage={errorMessage.tel_no}
          value={personalForm.tel_no}
          required=""
          length={20}
        />
        <SelectForm
          label="Marriage Status"
          defaultValue="Choose Marriage Status"
          errorMessage={errorMessage.marriage_id}
          required=""
          target="marriage_id"
          value={personalForm.marriage_id}
          selectList={marriageStatus}
        />
        <InputForm
          label="Bank Card No."
          target="card_number"
          type="number"
          errorMessage={errorMessage.card_number}
          value={personalForm.card_number}
          required=""
          length={30}
        />
        <InputForm
          label="Bank Account No."
          target="bank_account_no"
          type="number"
          errorMessage={errorMessage.bank_account_no}
          value={personalForm.bank_account_no}
          required=""
          length={30}
        />
        <InputForm
          label="Bank Name"
          target="bank_name"
          type="text"
          errorMessage={errorMessage.bank_name}
          value={personalForm.bank_name}
          required=""
          length={100}
        />
        <InputForm
          label="Family Card Number"
          target="family_card_number"
          type="number"
          errorMessage={errorMessage.family_card_number}
          value={personalForm.family_card_number}
          required=""
          length={30}
        />
        <InputForm
          label="Safety Insurance No."
          target="safety_insurance_no"
          type="number"
          errorMessage={errorMessage.safety_insurance_no}
          value={personalForm.safety_insurance_no}
          required=""
          length={30}
        />
        <InputForm
          label="Health Insurance No."
          target="health_insurance_no"
          type="number"
          errorMessage={errorMessage.health_insurance_no}
          value={personalForm.health_insurance_no}
          required=""
          length={30}
        />
      </div>
    </form>
  );
}

export default React.memo(PersonalForm);
