import { isAxiosError } from "axios";
import {
  LoginForm,
  ProfileForm,
  RegisterForm,
  ResponseUser,
} from "../../types/TUser";
import httpClient from "../../utils/httpClient";
import { toast } from "sonner";

export const AuthService = () => {
  const login = async (credentials: LoginForm) => {
    try {

      const result = await httpClient.post("/auth/login", credentials);
      console.log("result login", result);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const register = async (userData: RegisterForm) => {
    try {
      const result = await httpClient.post("/auth/register", userData);
      console.log("result register", result);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getUser = async () => {
    try {
      const { data } = await httpClient.get<ResponseUser>("/auth/getUser");
      return data.user; // Retornar los datos esperados por react-query
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
      throw error; // Asegurar que cualquier otro error también sea lanzado
    }
  };
  const updateUser = async (userData: ProfileForm) => {
    try {
      const { data } = await httpClient.patch<ResponseUser>(
        "/auth/updateUser",
        userData
      );

      toast.success(data.message);
      return data.user; // ✅ Devuelve el usuario actualizado correctamente
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }

      throw error; // ✅ IMPORTANTE: Lanza el error para que React Query lo detecte
    }
  };

  const uploadProfileImagen = async (file: File) => {
    try {

      const formData = new FormData();
      formData.append("file", file);
      console.log("hoka enteo",formData);

      const { data } = await httpClient.post(
        "/auth/uploadImageUser/image",
        formData
      );
      console.log("data",data);
      //toast.success(data.message);
      //return data.user; // ✅ Devuelve el usuario actualizado correctamente
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
      console.log("error",error);
      throw error; // ✅ IMPORTANTE: Lanza el error para que React Query lo detecte
    }
  };
  return { login, register, getUser, updateUser, uploadProfileImagen };
};
