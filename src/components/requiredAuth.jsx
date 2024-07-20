/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { UrlState } from "@/contex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const ReduireAuth = ({ children }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!isAuthenticated) return <BarLoader width={"100%"} color="#36d7b7" />;

  if (isAuthenticated) return children;
};

export default ReduireAuth;
