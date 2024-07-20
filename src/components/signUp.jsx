/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { signup } from "@/utiliti/userFetch";
import useFetch from "@/hooks/use-fetch";
import Error from "./error";
import * as Yup from "yup";
import { UrlState } from "@/contex";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState([]);

  const { data, error, loading, fn: fnSignup } = useFetch(signup);

  const { fetchUser } = UrlState();
  const navigator = useNavigate();

  let [searchParam] = useSearchParams();
  const longLink = searchParam.get("createNew");

  useEffect(() => {
    if (error === null && data) {
      localStorage.setItem("token", data.data);
      fetchUser();
      navigator(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, data]);

  async function handleSignup() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        file: Yup.mixed().required("Profile Pic is required"),
      });
      await schema.validate(
        { name, email, password, file },
        { abortEarly: false }
      );

      const formData = new FormData();
      formData.append("profile", file[0]);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      await fnSignup(formData);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>
            create a new account if ypu haven&rsquo;t already
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div className="space-y-1">
            <Input
              name="profile"
              type="file"
              accept="Image/*"
              onChange={(e) => setFile(e.target.files)}
            />
            {errors.profile && <Error message={errors.profile} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
