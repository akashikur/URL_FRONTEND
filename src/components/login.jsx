/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/utiliti/userFetch";
import * as Yup from "yup";
import { UrlState } from "@/contex";
import Error from "./error";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [formDate, setFormDate] = useState({
    email: "",
    password: "",
  });
  const navigator = useNavigate();

  let [searchParam] = useSearchParams();
  const longLink = searchParam.get("createNew");

  const [errors, setErrors] = useState([]);

  const handleImputChange = (e) => {
    const { name, value } = e.target;
    setFormDate((prev) => ({ ...prev, [name]: value }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formDate);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      localStorage.setItem("token", data.data);
      fetchUser();
      navigator(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, data]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formDate, { abortEarly: false });
      await fnLogin();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleImputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleImputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
