import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { LoginFormType } from "../../../constants/type";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CustomInputSelect, { customPaperProps } from "./StyleSelect";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Cookies from "js-cookie";
import { API_PATHS } from "../../../configs/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { setUserName } from "../../../redux/userSlice";
export default function LoginForm() {
  const [form, setForm] = useState<LoginFormType>({
    userName: "",
    passWord: "",
    factory: ""
  });
  const [errorMessage, setErrorMessage] = useState<LoginFormType>({
    userName: "",
    passWord: "",
    factory: ""
  });
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, userName: event.target.value }));
    setErrorMessage((prev) => ({ ...prev, userName: "" }));
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, passWord: event.target.value }));
    setErrorMessage((prev) => ({ ...prev, passWord: "" }));
  };

  const handleChangeFactory = (event: SelectChangeEvent<string>) => {
    setForm((prev) => ({ ...prev, factory: event.target.value }));
    setErrorMessage((prev) => ({ ...prev, factory: "" }));
  };
  const validateUser = (value: string) => {
    if (!value) {
      return "Please enter username";
    }
    return "";
  };
  const validatePass = (value: string) => {
    if (!value) {
      return "Please enter password";
    }
    return "";
  };
  const validateFactory = (value: string) => {
    if (!value) {
      return "Please choose factory";
    }
    return "";
  };
  const validLogin = (value: LoginFormType) => {
    return !value.userName && !value.passWord && !value.factory;
  };
  const onSubmit = () => {
    const validate = {
      userName: validateUser(form.userName),
      passWord: validatePass(form.passWord),
      factory: validateFactory(form.factory)
    };
    setErrorMessage(validate);
    if (!validLogin(validate)) {
      return;
    }
    onLogin(form);
  };
  const onLogin = async (value: LoginFormType) => {
    try {
      setLoading(true);

      const res = await axios.post(API_PATHS.signIn, {
        username: value.userName,
        password: value.passWord,
        company_id: parseInt(value.factory)
      });
      Cookies.set("token", res.data.data.token);
      setTimeout(() => {
        navigate("/employee", { replace: true });
      }, 1000);
    } catch (error: any) {
      toast.warn(error.response.data.message, {
        className: "bg-red-100 text-red-600 font-medium"
      });
    }
    setLoading(false);
  };

  return (
    <form
      className="w-96 rounded-sm p-8 py-12 shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-3 flex flex-col">
        <label className="text-left text-base ">Username</label>
        <input
          type="text"
          className="h-12 rounded-md  bg-slate-100 px-2 py-4 outline-none"
          value={form.userName}
          onChange={handleChangeUserName}
        />
        {!!errorMessage?.userName && <small className="text-left text-red-600">{errorMessage.userName}</small>}
      </div>
      <div className="mb-3 flex flex-col ">
        <label className="text-left ">Password</label>
        <div className=" flex h-12 w-full flex-row justify-between rounded-md  bg-slate-100 px-2 ">
          <input
            type={hidePassword ? "password" : "text"}
            className=" w-3/4 bg-inherit outline-none"
            value={form.passWord}
            onChange={handleChangePassword}
          />
          {!!form.passWord && (
            <div
              className="flex items-center justify-center hover:cursor-pointer"
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
            >
              {hidePassword ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </div>
          )}
        </div>
        {!!errorMessage?.passWord && <small className="text-left text-red-600">{errorMessage.passWord}</small>}
      </div>
      <div className="mb-3 flex flex-col">
        <label className="text-left  ">Factory</label>
        <Select
          defaultValue=""
          onChange={handleChangeFactory}
          className="flex h-12 w-full flex-row justify-between rounded-md border-none bg-slate-100  px-2"
          displayEmpty
          input={<CustomInputSelect />}
          MenuProps={{
            PaperProps: customPaperProps
          }}
        >
          <MenuItem hidden value="">
            Select Factory
          </MenuItem>
          <MenuItem value="1">SBM</MenuItem>
          <MenuItem value="2">DMF</MenuItem>
        </Select>
        {!!errorMessage?.factory && <small className="text-left text-red-600">{errorMessage.factory}</small>}
      </div>
      {!loading ? (
        <Button
          type="submit"
          className="mt-3  h-9 w-full border-none bg-blue-500 text-white outline-none hover:bg-blue-600"
        >
          Sign In
        </Button>
      ) : (
        <Button className="mt-3 h-9 w-full border-none bg-slate-100" disabled>
          <CircularProgress color="inherit" size="20px" />
        </Button>
      )}

      <a href="" className="text-xs text-blue-500  hover:underline">
        Forgot Your Password?
      </a>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ width: "500px" }}
      />
    </form>
  );
}
