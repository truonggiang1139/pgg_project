import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Typography } from "@mui/material";

export default function BreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname;
  console.log(pathnames);

  const breadcrumbs = [
    <Link className="text-link" key={1} to="/home">
      MUI
    </Link>,
    <Typography key="3" color="text.primary">
      MUI
    </Typography>
  ];
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {breadcrumbs}
    </Breadcrumbs>
  );
}
