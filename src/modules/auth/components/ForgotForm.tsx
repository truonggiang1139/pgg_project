import { Button, FormControl, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "../../../CustomStyle/StyleInput";
import { Link } from "react-router-dom";
import { API_PATHS } from "../../../configs/api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function ForgotForm() {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    validateEmail(e.target.value);
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrorMessage("Please enter your email");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
      return;
    }
    setErrorMessage("");
  };

  const onSubmit = async (value: string) => {
    if (errorMessage) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(API_PATHS.forgotPassword, {
        email: value
      });
    } catch (error: any) {
      toast.warn(error.response.data.message, {
        className: "bg-red-100 text-red-600 font-medium"
      });
    }
    setLoading(false);
  };
  return (
    <form
      className="w-96 rounded-xl p-8 shadow-lg "
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <div className="mb-3 flex flex-col">
        <label className="mb-4 text-left text-base">Your work email</label>
        <FormControl>
          <CustomTextField
            disableUnderline
            type="text"
            error={!!errorMessage}
            value={value}
            onChange={handleChangeValue}
          />
          {!!errorMessage && <FormHelperText sx={{ color: "rgb(229, 72, 77)" }}>{errorMessage}</FormHelperText>}
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          disableElevation
          sx={{
            backgroundColor: "rgb(0, 145, 255)",
            height: "48px",
            borderRadius: "6px",
            marginTop: "16px",
            fontWeight: "bold",
            textTransform: "none"
          }}
        >
          Confirm & Send OTP
        </Button>
        <Link to="/auth/login" className="mt-6 text-sm text-blue-400  hover:underline">
          Back to Sign In
        </Link>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={3}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ width: "500px" }}
        />
      </div>
    </form>
  );
}
