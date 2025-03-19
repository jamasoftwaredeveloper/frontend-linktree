import { LoginForm, RegisterForm, RegisterResponse } from "../../types/TUser";
import httpClient from "../../utils/httpClient";

export const login = async (credentials: LoginForm) => {
  const response = await httpClient.post("/auth/login", credentials);
  return response.data as RegisterResponse;
};

export const register = async (userData: RegisterForm) => {
  const response = await httpClient.post("/auth/register", userData);
  return response.data as RegisterResponse;
};
