import { InputAdornment, Popover, TextField, Typography } from "@mui/material";

import BreadCrumbs from "../components/BreadCrumbs";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

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

  return (
    <div className="flex min-h-screen flex-col ">
      <Header />
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
