import { createContext, PropsWithChildren, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

import {
  loginGoogleRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
} from "../api/auth";
import { AuthContextType, IUser } from "../types/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeRespose) => handleGoogleLogin(codeRespose.access_token),
    onError: (error) => console.log("Login failed", error),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAuthSuccess = (response: any) => {
    setUser(response.data.result);
    toast.success(response.data.message);
    setIsAuthenticated(true);
    Cookies.set("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.result));
    navigate("/");
  };

  const handleGoogleLogin = async (accessToken: string) => {
    try {
      const response = await loginGoogleRequest(accessToken);

      if (response.data.success) {
        handleAuthSuccess(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const loginUser = async (user: IUser) => {
    try {
      const response = await loginRequest(user);

      if (response.data.success) {
        handleAuthSuccess(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const registerUser = async (user: IUser) => {
    try {
      const response = await registerRequest(user);

      if (response.data.success) {
        handleAuthSuccess(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const resetPassword = async (user: IUser) => {
    try {
      const response = await resetPasswordRequest(user);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/Login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkAuth = () => {
    const token = Cookies.get("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginGoogle,
        loginUser,
        registerUser,
        resetPassword,
        logout,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
