// import { NewAxios } from "AXIOS/axios";
import { $LOCAL_LOGGEDIN_KEY } from "../Store/contants";
// import Axios from "axios";
const user = JSON.parse(localStorage.getItem($LOCAL_LOGGEDIN_KEY) || "{}")
  ?.state?.user;

import AXIOS, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

class NewAxios {
  successCode: number = 2023;

  private controller = new AbortController();
  private abortController = this.controller.signal;
  private baseURL: string = "";
  private axios: AxiosInstance;
  private successStatusCodes = [1000, 2100];

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.axios = AXIOS.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: token,
      },
    });
    this.axios.interceptors.request.use(
      function (config): any {
        if (config.headers.Authorization) return config;
        const response = {
          data: {},
          status: 401,
          statusText: "Not Authorized",
          message: "Token is not available",
        };
        throw { response };
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getMethod(url: string, config?: AxiosRequestConfig) {
    let response: AxiosResponse;
    try {
      response = await this.axios.get(url, {
        ...config,
        signal: this.abortController,
      });
      if (this.successStatusCodes.includes(response.data.status)) {
        const data = response.data;
        return data;
      } else throw Error(response.data);
    } catch (error: any) {
      const errorData = {
        data: error?.response?.data,
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.response?.message,
      };
      console.log(errorData, "erroData");

      return errorData;
    }
  }
  async postMethod(url: string, data: any, config?: AxiosRequestConfig) {
    let response: AxiosResponse;
    try {
      response = await this.axios.post(url, data, {
        ...config,
        signal: this.abortController,
      });
      // if (
      //   this.successStatusCodes.includes(response.status)
      // ) {
      // } else throw Error(response.data.code);
      return response.data;
    } catch (error: any) {
      return {
        data: error?.response?.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
  }
  async putMethod(url: string, data: any, config?: AxiosRequestConfig) {
    let response: AxiosResponse;
    try {
      response = await this.axios.put(url, data, {
        ...config,
        signal: this.abortController,
      });
      // if (
      //   this.successStatusCodes.includes(response.status) &&
      //   response.data.status === true
      // ) {
      // } else throw Error(response.data.code);
      return response.data;
    } catch (error: any) {
      return {
        data: error?.response?.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
  }
  async patchMethod(url: string, data: any, config?: AxiosRequestConfig) {
    let response: AxiosResponse;
    try {
      response = await this.axios.patch(url, data, {
        ...config,
        signal: this.abortController,
      });
      // if (
      //   this.successStatusCodes.includes(response.status) &&
      //   response.data.status === true
      // ) {
      // } else throw Error(response.data.code);
      return response.data;
    } catch (error: any) {
      return {
        data: error?.response?.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
  }
  async deleteMethod(url: string, config?: AxiosRequestConfig) {
    let response: AxiosResponse;
    try {
      response = await this.axios.delete(url, {
        ...config,
        signal: this.abortController,
      });
      // if (
      //   this.successStatusCodes.includes(response.status) &&
      //   response.data.status === true
      // ) {
      // } else throw Error(response.data.code);
      return response.data;
    } catch (error: any) {
      return {
        data: error?.response?.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
  }
  cancelCurrentRequest() {
    this.controller.abort();
  }
}

export const axios = new NewAxios(
  "https://apis-edique.qkkalabs.com/api/v1/",
  `Bearer ${user?.accessToken}`
);

// Unauthorized
// errorReponse = {
//   "data": {
//       "success": false,
//       "status": 401,
//       "message": "Unauthorized",
//       "data": {}
//   },
//   "message":undefined,
//   "status": 401,
//   "statusText": "Unauthorized"
// }

// internal server error
// {
//   "data": {
//       "success": false,
//       "status": 500,
//       "message": "Internal server error",
//       "data": {}
//   },
//   "message":undefined,
//   "status": 500,
//   "statusText": "Internal Server Error"
// }

export const endPoints = {
  login: "user/login",
  project: "opms/project",
  teacher: "teacher",
  students: "student",
  studentDetails: "student/details",
  schools: "opms/school/project",
  schoolMono: "opms/school",
  labUsage: "lab-usage",
  users: "users",
  user: "user",
  userCreate: "user/create",
  bankDetails: "user/bank-details",
  qualification: "user/qualification",
  experience: "user/experience",
  uploadFile:
    "https://75xpmhkhcb.execute-api.us-east-2.amazonaws.com/signed-url-upload",
  visitors: "visitor",
  dcVisitor: "visitor/dc-visitor",
  asset: "asset",
  serviceDesk: "service-desk",
  faq: "faq",
  labAsset: "asset",
  training: "teacher-training",
};
