/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, AxiosRequestConfig } from 'axios';

import { LOGIN_TOKEN } from '../constants/user';
import { getItem } from '../utils/storage';

const API_ENDPOINT = `${import.meta.env.VITE_APP_URL}:${
  import.meta.env.VITE_APP_PORT
}`;

interface CustomInstance extends AxiosInstance {
  get<T>(...params: Parameters<AxiosInstance['get']>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance['delete']>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance['post']>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance['put']>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance['patch']>): Promise<T>;
}

export const axiosInstance: CustomInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getItem(LOGIN_TOKEN, '');
  if (token && config.headers) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

export const getRequest = async <T>(
  url: string,
  params?: AxiosRequestConfig['params'],
  pathParams?: Record<string, any>,
): Promise<T> => {
  let finalUrl = url;
  if (pathParams) {
    Object.keys(pathParams).forEach((key) => {
      finalUrl = finalUrl.replace(`{${key}}`, pathParams[key]);
    });
  }
  return await axiosInstance.get<T>(finalUrl, { params });
};

function flattenParams(params: Record<string, any>): Record<string, any> {
  if (typeof params === 'object' && params !== null) {
    const keys = Object.keys(params);
    if (keys.length === 1 && typeof params[keys[0]] === 'object') {
      return params[keys[0]];
    }
  }
  return params;
}

export const postRequest = async <T, U>(
  url: string,
  body?: U,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return await axiosInstance.post<T>(url, flattenParams(body), config);
};

export const putRequest = async <T, U>(
  url: string,
  body?: U,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return await axiosInstance.put<T>(url, flattenParams(body), config);
};

export const deleteRequest = async <T, U>(
  url: string,
  body?: U,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return await axiosInstance.delete<T>(url, {
    data: { ...body },
    ...config,
  });
};
