import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios.js";
import { MatxLoading } from "app/components";
import api from "app/config";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  return !!decodedToken; //.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //url http://localhost:4050/login
  const login = async (email, password) => {
    const response = await axios.post("http://localhost:4050/login", {
      email: email,
      password,
    });
    // console.log("Login Test", response.data);
    // if (!["admin", "rep"].includes(response.data.user.role)) {
    //   console.log("You are not an Admin/Rep");
    //   return;
    // }

    const { token: accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const register = async (
    email,
    password,
    title,
    first_name,
    surname,
    phone_number,
    company_name,
    job_title
  ) => {
    // const response = await axios.post("http://localhost:4050/register", {
    const response = await api.post("/register", {
      email: email,
      password,
      title: title,
      surname: surname,
      first_name: first_name,
      phone_number: phone_number,
      company_name: company_name,
      job_title: job_title,
      role: "client",
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        console.log("accessToken :>> ", accessToken);
        if (accessToken && isValidToken(accessToken)) {
          console.log("IT IAs VALID");
          setSession(accessToken);
          const response = await axios.get("http://localhost:4050/me");
          // console.log("responsed", response);
          const user = response.data;

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
