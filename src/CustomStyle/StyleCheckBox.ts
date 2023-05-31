import { styled } from "@mui/material/styles";
import { Checkbox } from "@mui/material";

export const CustomCheckBox = styled(Checkbox)(() => ({
  "&.Mui-checked": {
    color: "rgb(48, 164, 108) !important"
  },
  "&.Mui-disabled": {
    color: "rgb(215,219,223) !important"
  }
}));
