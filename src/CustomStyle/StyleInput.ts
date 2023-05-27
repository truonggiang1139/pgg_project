import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";

export const CustomTextField = styled(Input)(() => ({
  textTransform: "none",
  height: "48px",
  fontWeight: "400",
  padding: "16px 8px",
  borderRadius: "6px",
  backgroundColor: "rgb(241,243,245)",
  color: "rgba(0, 0, 0, 0.85)",
  "& input[type=number]": {
    " moz-appearance": "textfield"
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    "webkit-appearance": "none",
    margin: 0
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    "webkit-appearance": "none",
    margin: 0
  },
  "&.Mui-error": {
    backgroundColor: "rgb(255, 239, 239)",
    border: "1px solid rgb(243, 174, 175)"
  }
}));
