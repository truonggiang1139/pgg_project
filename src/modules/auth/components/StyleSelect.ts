import { InputBase, PaperProps, styled } from "@mui/material";

export const customPaperProps: PaperProps = {
  sx: {
    marginTop: "2px",
    boxShadow: "none",
    fontWeight: "400",
    fontSize: "16px",
    border: " 1px solid rgb(223, 227, 230)",
    padding: "0 10px",
    "& .MuiMenuItem-root": {
      marginBottom: "2px"
    },
    "& .MuiMenuItem-root:hover": {
      color: "rgb(48, 164, 108)",
      borderRadius: "8px"
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: "rgb(233, 249, 238)",
      borderRadius: "8px",
      color: "rgb(48, 164, 108)"
    }
  }
};

const CustomInputSelect = styled(InputBase)(({ theme }) => ({
  textTransform: "none",
  height: "48px",
  fontWeight: "400",
  padding: "16px 8px",
  borderRadius: "6px",
  backgroundColor: "rgb(241,243,245)",
  color: "rgba(0, 0, 0, 0.85)",
  // boxShadow: "none",
  "&.Mui-focused": {
    backgroundColor: "rgba(0, 0, 0, 0.09) "
  },
  "&.Mui-focused:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  ".MuiOutlinedInput-notchedOutline": {
    // border: "none",
    borderRadius: "0.25rem",
    backgroundColor: "red"
  },
  ".MuiSelect-select": {
    display: "flex",
    innerWidth: "100%",

    borderRadius: "0.25rem",
    marginLeft: "12px",
    fontWeight: "400"
  },

  "&.Mui-error": {
    backgroundColor: "rgb(255, 239, 239)",
    border: "1px solid rgb(243, 174, 175)"
  },
  "&.Mui-disabled": {
    backgroundColor: "rgba(0, 0, 0, 0.12)"
  }
}));

export default CustomInputSelect;
