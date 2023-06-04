import React, { useState, useEffect } from "react";
import logo from "../../assets/Rectangle 4.svg";
import { Box, Popover, Avatar, Typography, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { ReactComponent as IconClose } from "../../assets/iconClose.svg";
import { API_PATHS } from "../../configs/api";
type userDetailType = {
  id: number;
  username: string;
  email: string;
  role_id: number;
  employee_id: number | null;
  department_id: number | null;
  company_id: number;
  register_token: string | number;
  email_verified_at: string | null;
  is_active: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  department: {
    id: number;
    name: string;
    code: string;
    company_id: number;
    created_at: string;
    updated_at: string;
  };
  position_name: string;
};
export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [userDetail, setUserDetail] = useState<userDetailType>({
    id: 0,
    username: "",
    email: "",
    role_id: 0,
    employee_id: null,
    department_id: null,
    company_id: 0,
    register_token: "",
    email_verified_at: null,
    is_active: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    department: {
      id: 0,
      name: "",
      code: "",
      company_id: 0,
      created_at: "",
      updated_at: ""
    },
    position_name: ""
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getUserDetail = async () => {
    const res = await axios.get(API_PATHS.detail, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });
    setUserDetail(res.data.data);
  };
  const handleLogout = () => {};
  useEffect(() => {
    getUserDetail();
  }, []);
  return (
    <header className="fixed left-0 right-0 top-0 z-30  flex h-16 flex-row justify-between bg-white px-8 py-2 shadow-md ">
      <div className="flex items-center">
        <img src={logo} alt="" className="mr-3 h-9 w-9" />
        <div className="text-2xl font-semibold">HR Management System</div>
      </div>
      <div className="flex items-center">
        {userDetail.username && (
          <button onClick={handleClick} className="h-8  w-8 items-center rounded-1/2 bg-benefitItem  text-white">
            <Avatar sx={{ backgroundColor: "rgb(230, 232, 235)", height: "32px", width: "32px" }}>
              {userDetail.username.charAt(0)}
            </Avatar>
          </button>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
        >
          <Box
            sx={{
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              paddingX: "20px",
              paddingY: "24px",
              borderRadius: "8px"
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar sx={{ backgroundColor: "rgb(230, 232, 235)", height: "32px", width: "32px" }}>
                {userDetail.username.charAt(0)}
              </Avatar>
              <Typography sx={{ marginLeft: "8px", fontWeight: "bold", fontSize: "22px" }}>
                {userDetail.username}
              </Typography>
            </Box>
            <Box sx={{ paddingY: "20px" }}>
              <Typography sx={{ fontSize: "16px", marginBottom: "10px" }}>{userDetail.department.name}</Typography>
              <Typography sx={{ fontSize: "16px" }}>Staff ID:</Typography>
            </Box>
            <Button
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "rgb(0, 145, 255)", paddingY: "10px", textTransform: "none" }}
              onClick={handleClickOpenDialog}
            >
              Sign Out
            </Button>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                sx={{
                  width: "350px",
                  padding: "20px 16px 4px 24px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>Do you wish to sign out?</Typography>
                  <Button
                    sx={{ width: "34px", height: "34px", borderRadius: "50%", minWidth: "0px" }}
                    onClick={handleCloseDialog}
                  >
                    <IconClose height={"24px"} width={"24px"} />
                  </Button>
                </Box>
              </DialogTitle>
              <DialogActions sx={{ display: "flex", justifyContent: "space-between", padding: "24px" }}>
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  sx={{
                    width: "140px",
                    height: "48px",
                    backgroundColor: "rgb(241, 243, 245)",
                    color: "rgb(17, 24, 28)",
                    borderRadius: "6px",
                    fontWeight: "500",
                    textTransform: "none",
                    ":hover": { backgroundColor: "rgba(0, 145, 255, 0.08)" }
                  }}
                  onClick={handleCloseDialog}
                >
                  No
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  sx={{
                    width: "140px",
                    height: "48px",
                    borderRadius: "6px",
                    backgroundColor: "rgb(0, 145, 255)",
                    fontWeight: "500",
                    textTransform: "none"
                  }}
                  onClick={handleLogout}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <Typography sx={{ fontSize: "14px", color: "rgb(0, 145, 255)", marginTop: "12px", cursor: "pointer" }}>
              Reset Password
            </Typography>
          </Box>
        </Popover>
      </div>
    </header>
  );
}
