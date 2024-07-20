/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./utiliti/userFetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, setIsAuthenticated, fetchUser]);

  return (
    <UrlContext.Provider value={{ isAuthenticated, user, fetchUser, loading }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
