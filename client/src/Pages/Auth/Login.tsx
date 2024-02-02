import { useState } from "react";
import { API_URL } from "../../api/urls";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    try {
      const res = await API_URL.post("/user/login", {
        email,
        password,
      });
      Cookies.set("token", res.data?.token, {
        sameSite: "None",
      });
      navigation("/");
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" grid gap-4 max-w-md">
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className=" bg-inherit text-white w-full focus:outline-none border border-gray-400 p-3 rounded"
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
