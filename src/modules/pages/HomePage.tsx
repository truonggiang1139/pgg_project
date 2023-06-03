import { Button, InputAdornment, Popover, TextField, Typography } from "@mui/material";
import logo from "../../assets/Rectangle 4.svg";
import BreadCrumbs from "../components/BreadCrumbs";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { resetForm } from "../../redux/employeeSlice";
export default function HomePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const searchValue = searchParams.get("search");
  const [query, setQuery] = useState(searchValue);
  const navigate = useNavigate();
  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(() => {
        navigate(`/employee?search=${query === "null" ? "" : query}&page=${1}`);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
    if (searchValue) {
      setTimeout(() => {
        navigate(`/employee?search=${query}&page=${1}`);
      }, 1000);
    }
  }, [query]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="flex min-h-screen flex-col ">
      <header className="fixed left-0 right-0 top-0 z-30 flex flex h-16 flex-row justify-between bg-white px-8 py-2 shadow-md ">
        <div className="flex items-center">
          <img src={logo} alt="" className="mr-3 h-9 w-9" />
          <div className="text-2xl font-semibold">HR Management System</div>
        </div>
        <div className="flex items-center">
          <button onClick={handleClick} className="h-8  w-8 items-center rounded-1/2 bg-red-400">
            g
          </button>
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
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </div>
      </header>
      <div className=" mt-16 flex  w-full ">
        <SideBar />
        <div className="   ml-1/5 flex  w-4/5 bg-rightContent ">
          <div className="mx-auto mt-8 w-11/12">
            <BreadCrumbs />
            <div className="my-4 flex justify-between">
              <div className=" text-left text-3xl">Employee Management</div>
              <TextField
                size="small"
                value={query || ""}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                InputProps={{
                  sx: { borderRadius: "10px", width: "200px", backgroundColor: "white" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
}
