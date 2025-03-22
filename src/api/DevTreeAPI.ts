import { isAxiosError } from "axios";
import httpClient from "../utils/httpClient";
import { ResponseUser } from "../types/TUser";

export async function getUser() {
  try {
    const { data } = await httpClient.get<ResponseUser>("/auth/getUser");
    return data.user; // Retornar los datos esperados por react-query
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error; // Asegurar que cualquier otro error también sea lanzado
  }
}
