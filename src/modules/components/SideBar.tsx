import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import iconAttendance from "../../assets/iconAttendance.svg";
import iconLeave from "../../assets/iconLeave.svg";
import iconPayroll from "../../assets/iconPayroll.svg";
import iconEmployee from "../../assets/iconEmployee.svg";
import iconUser from "../../assets/iconUser.svg";
import iconMaster from "../../assets/iconMaster.svg";
import iconGlobal from "../../assets/iconGlobal.svg";
import iconSetting from "../../assets/iconSetting.svg";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className=" fixed z-10 flex h-screen w-1/5 flex-col items-center bg-white">
      <div className="mt-4 w-4/5">
        <p className="text-left text-2xl font-semibold text-blue-500">General</p>
      </div>
      <List sx={{ width: "95%", backgroundColor: "white" }} component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton className="my-3 rounded-lg hover:bg-hoverItemSideBar ">
          <ListItemIcon>
            <img src={iconAttendance} alt="" />
          </ListItemIcon>
          <ListItemText primary="Attendance Management" />
        </ListItemButton>
        <ListItemButton className="my-3 rounded-lg hover:bg-hoverItemSideBar">
          <ListItemIcon>
            <img src={iconLeave} alt="" />
          </ListItemIcon>
          <ListItemText primary="Leave Management" />
        </ListItemButton>
        <ListItemButton className="my-3 rounded-lg hover:bg-hoverItemSideBar">
          <ListItemIcon>
            <img src={iconPayroll} alt="" />
          </ListItemIcon>
          <ListItemText primary="Payroll Management" />
        </ListItemButton>
        <ListItemButton
          className="my-3 rounded-lg bg-itemSelectedSideBar hover:bg-hoverSelectedSideBar hover:text-black"
          component={Link}
          to="/employee"
        >
          <ListItemIcon>
            <img src={iconEmployee} alt="" className="rounded-full bg-selectedIcon p-2 shadow-selected" />
          </ListItemIcon>
          <ListItemText primary="Employee Management" />
        </ListItemButton>
        <ListItemButton className="my-3 rounded-lg hover:bg-hoverItemSideBar">
          <ListItemIcon>
            <img src={iconUser} alt="" />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItemButton>
        <ListItemButton className="mt-3 rounded-lg hover:bg-hoverItemSideBar">
          <ListItemIcon>
            <img src={iconMaster} alt="" />
          </ListItemIcon>
          <ListItemText primary="Master  Management" />
        </ListItemButton>
      </List>
      <hr
        style={{
          width: "95%",
          margin: " 10px 0px",
          flexShrink: 0,
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)"
        }}
      />
      <div className="w-4/5">
        <p className="text-left text-2xl font-semibold ">Advance</p>
      </div>

      <List sx={{ width: "95%", backgroundColor: "white" }} component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton className="my-3 rounded-lg hover:bg-hoverItemSideBar ">
          <ListItemIcon>
            <img src={iconGlobal} alt="" className="rounded-full bg-slate-100  p-2" />
          </ListItemIcon>
          <ListItemText primary="Global Settings" />
        </ListItemButton>
        <ListItemButton className="my-3 rounded-lg hover:bg-hoverItemSideBar ">
          <ListItemIcon>
            <img src={iconSetting} alt="" className="rounded-full bg-slate-100  p-2" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </div>
  );
}
