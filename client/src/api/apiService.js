import axios from 'axios';
import { baseURL } from './apiParams';
import Cookies from 'js-cookie';

class ApiService {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 10000,  // 10 saniye zaman aşımı
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      config => {
        const token = Cookies.get("DD_token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  async                                                                                                                                                       (endpoint, params = {}) {
    try {
      const response = await this.axiosInstance.get(endpoint, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response ? error.response.data : error.message };
    }
  }

  async post(endpoint, data, contentType = 'application/json') {
    try {
      const headers = {
        'Content-Type': contentType,
      };

      const response = await this.axiosInstance.post(endpoint, data, { headers });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response ? error.response.data : error.message };
    }
  }
}

export const apiService = new ApiService(baseURL);
