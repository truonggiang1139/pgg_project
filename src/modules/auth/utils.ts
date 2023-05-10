import { LoginFormType } from "../../constants/type";

const validateUser = (user: string) => {
  if (!user) {
    return "Please enter username";
  }
  return "";
};

const validatePassword = (password: string) => {
  if (!password) {
    return "Please enter password";
  }

  if (password.length < 4) {
    return "Must input password between 8-16 characters";
  }

  return "";
};

export const validateLogin = (values: LoginFormType): LoginFormType => {
  return {
    userName: Valid
  };
};

export const validLogin = (values: LoginFormType) => {
  return !values.email && !values.password;
};
