import React, { useEffect, createContext, useState } from "react";
import jwtDecode from "jwt-decode";

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : {}
  );

  const [error, setError] = useState(false);

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);

  let loginUser = async (userInfo) => {
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password,
      }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setError(false);
      return;
    } else if (response.status === 401) {
      setError(true);
    } else {
      setError(true);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setError(false);
    localStorage.removeItem("authTokens");
    setUser({});
  };

  let updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      setError(false);
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 4 * 60;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        error: error,
      }}
    >
      {loading ? null : children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
