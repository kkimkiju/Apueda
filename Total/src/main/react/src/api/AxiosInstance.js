// axiosInstance.js
import axios from "axios";
import AxiosApi from "./AxiosApi";
const Apueda_Domain = "";

const AxiosInstance = axios.create({
  // axios 인스턴스 생성
  baseURL: Apueda_Domain,
});

AxiosInstance.interceptors.request.use(
  // 요청 인터셉터 추가
  async (config) => {
    const accessToken = AxiosApi.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error); // 에러 발생시
  }
);

AxiosInstance.interceptors.response.use(
  // 응답 인터셉터 추가
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          break;
        case 401:
          // 401 에러 발생시
          const rsp = await AxiosApi.handleUnauthorized();
          if (rsp) {
            // 재시도
            error.config.headers.Authorization = `Bearer ${AxiosApi.getRefreshToken()}`;
            return AxiosInstance.request(error.config);
          } else {
          }
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
