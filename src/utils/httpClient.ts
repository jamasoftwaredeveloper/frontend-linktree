import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { toast } from "sonner";

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => {
        if (isAxiosError(response) && response.response) {
          toast.success(response.response.data.message);
        }

        if (response.data) {
          const { message, token } = response.data;
          toast.success(message);
          localStorage.setItem("token", token);
        }
        console.log("response 1", response.data);

        return Promise.reject(response);
      },
      (error) => {
        if (isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
        console.log("error", error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.instance.get<T>(url, { ...config, headers: { ...config?.headers, ...headers } });
  }

  async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const isAuthRoute = url.includes("register") || url.includes("login");
    const token = !isAuthRoute ? localStorage.getItem("token") : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.instance.post<T>(url, data, { ...config, headers: { ...config?.headers, ...headers } });
  }

  async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.instance.put<T>(url, data, { ...config, headers: { ...config?.headers, ...headers } });
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.instance.delete<T>(url, { ...config, headers: { ...config?.headers, ...headers } });
  }
}

const httpClient = new HttpClient(import.meta.env.VITE_API_URL); // Replace with your API base URL

export default httpClient;
