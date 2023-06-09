import logo from "../../../assets/Rectangle 4.svg";
import LoginForm from "../components/LoginForm";
export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center ">
      <img src={logo} alt="" className="mt-16 w-16 " />
      <h2 className=" text-4xl font-bold">HR Management System</h2>
      <h2 className="my-6 text-3xl font-bold">Sign In</h2>
      <LoginForm />

      <footer className="sticky top-full p-8 text-xs">Copyright © 2022. All Rights Reserved</footer>
    </div>
  );
}
