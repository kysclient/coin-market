import { AxiosRequestConfig, AxiosResponse } from "axios";
import { client } from "./axios";

interface ApiResponse<T = any> {
  success: boolean;
  result: T | null;
  error: any;
  headers?: any;
}

const awaitApi = async <T>(
  _config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await client(_config);
    return {
      success: true,
      result: response.data,
      error: false,
      headers: response.headers,
    };
  } catch (e) {
    return {
      success: false,
      result: null,
      error: e,
    };
  }
};

const request = {
  coins: {
    getMarkets: async (vs_currency: string, condition: Object | null) => {
      const queryParams = getQueryParams(condition);
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/coins/markets?vs_currency=${vs_currency}&${queryParams}`,
      };
      return await awaitApi(config);
    },
    getMarket: async (id: string) => {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/coins/${id}/market_chart`,
      };
      return await awaitApi(config);
    },
    geDetail: async (id: string) => {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/coins/${id}`,
      };
      return await awaitApi(config);
    },
  },
  exchanges: {
    getExchangeRates: async () => {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/exchange_rates`,
      };
      return await awaitApi(config);
    },
  },
};

export const apiRequest = {
  coins: {
    getMarkets: request.coins.getMarkets,
    geDetail: request.coins.geDetail,
    getMarket: request.coins.getMarket,
  },
  exchanges: {
    getExchangeRates: request.exchanges.getExchangeRates,
  },
};

const getQueryParams = (condition: Object | null): string => {
  return condition
    ? Object.entries(condition)
        .map((e) => e.join("="))
        .join("&")
    : "";
};
