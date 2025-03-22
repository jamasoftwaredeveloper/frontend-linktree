import { isAxiosError } from "axios";
import { LoginForm, RegisterForm } from "../../types/TUser";
import httpClient from "../../utils/httpClient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (credentials: LoginForm) => {
    try {
      await httpClient.post("/auth/login", credentials);

      navigate("/admin/profile");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const register = async (userData: RegisterForm) => {
    try {
      await httpClient.post("/auth/register", userData);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return { login, register };
};
