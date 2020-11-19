import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse,
} from "axios";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;
const __API_BASE_URL__ = "http://200.123.150.57:62999/";

export default class AxiosWrapper {
  private instance: AxiosInstance;
  private defaultConfig: ICustomAxiosConfig = {
    useErrorInterceptor: true,
  };

  constructor(options?: ICustomAxiosConfig) {
    const customConfig = Object.assign(this.defaultConfig, options);
    const errorInterceptor = this.errorInterceptor;
    const successInterceptor = (res: AxiosResponse) => res;
    this.instance = axios.create(this.getConfig(customConfig));
    this.instance.interceptors.response.use(
      successInterceptor,
      errorInterceptor
    );
  }
  get<T>(url: string, config?: AxiosRequestConfig): T {
    return this.instance.get<T>(url, config) as any;
  }

  post<T = any>(url: string, data: any, config?: AxiosRequestConfig): T {
    return this.instance.post<T>(url, data, config) as any;
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }

  request<T>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config);
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this.instance.head(url, config);
  }

  put<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  patch<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
    return this.instance.patch<T>(url, data, config);
  }

  private successInterceptor = (response: AxiosResponse) => response.data;
  private errorInterceptor = (error: AxiosError) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    Storage.clear().then((res) => this.redirectToLogin("/login"));
  };

  private redirectToLogin = (url: string) => {
    window.location.replace(url);
  };

  private getConfig(config: ICustomAxiosConfig): AxiosRequestConfig {
    return {
      ...config,
      baseURL: `${__API_BASE_URL__}/`,
      timeout: 40 * 1000, // 30 sec
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };
  }
}

interface ICustomAxiosConfig {
  useErrorInterceptor: boolean;
}
