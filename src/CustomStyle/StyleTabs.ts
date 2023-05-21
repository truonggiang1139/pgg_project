import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";

export const CustomTabs = styled(Tabs)({
  "& .MuiTabs-root": {
    border: "none"
  },
  "& .MuiTabs-flexContainer": {
    //   backgroundColor: '#1890ff',
    gap: "4px"
  },
  "& .MuiTabs-indicator": {
    height: "0px"
  }
});
