import { Button } from "@mui/material";
import iconAttendance from "../../assets/iconAttendance.svg";

export default function SideBar() {
  return (
    <div className="z-0  w-1/5 overflow-auto bg-black">
      <div className=" pl-6 text-left">
        <div className="groupItem">
          <header className="text-2xl font-semibold text-blue-500">General</header>
          <a href="">
            <Button>abc</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
