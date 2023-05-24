import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
interface CustomTabProps {
  "data-value"?: boolean;
}
export const CustomeTab = styled(Tab)<CustomTabProps>(({ theme, ...props }) => ({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "400",
  marginRight: theme.spacing(1),

  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": {
    opacity: 1
  },
  "&:active": {
    outline: "none"
  },
  "&.MuiTab-root": {
    color: props["data-value"] ? "rgb(229, 72, 77)" : "#0097ff",
    backgroundColor: props["data-value"] ? "rgb(255,239,239)" : "rgb(237,246,255)",
    minWidth: 180,
    minHeight: 42,
    padding: "6px 16px",
    borderRadius: "6px"
  },
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: props["data-value"] ? "rgb(229,72,77)" : "rgb(0, 129, 241)",
    outline: "none"
  }
}));
