import { InputAdornment, TextField } from "@mui/material";
import logo from "../../assets/Rectangle 4.svg";
import BreadCrumbs from "../components/BreadCrumbs";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import SearchIcon from "@mui/icons-material/Search";
export default function HomePage() {
  return (
    <div className="flex flex-col ">
      <header className="fixed left-0 right-0 top-0 z-10 flex h-16 flex-row bg-white px-8 py-2 shadow-md ">
        <div className="flex items-center">
          <img src={logo} alt="" className="mr-3 h-9 w-9" />
          <div className="text-2xl font-semibold">HR Management System</div>
        </div>
      </header>
      <div className="mt-16  flex h-screen w-full ">
        <SideBar />
        <div className="  flex w-4/5 bg-rightContent">
          <div className="mx-auto mt-8 w-11/12">
            <BreadCrumbs />
            <div className="my-4 flex justify-between">
              <div className=" text-left text-3xl">Employee Management</div>
              <TextField
                size="small"
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
