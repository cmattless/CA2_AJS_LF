import React from "react";
import api from "../config/api";

interface IRequestConfig {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, unknown> | null;
  headers?: Record<string, string>;
}

interface IRequest {
  loading: boolean;
  error: string | null;
  response: unknown;
  sendRequest: <T>(config: IRequestConfig) => Promise<T>;
}

/**
 * Custom hook to handle API requests.
 */
const useRequests = (): IRequest => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [response, setResponse] = React.useState<unknown>(null);

  const sendRequest = React.useCallback(
    async <T>({
      endpoint,
      method = "GET",
      data = null,
      headers = {},
    }: IRequestConfig): Promise<T> => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const config = {
          method,
          url: endpoint,
          headers,
          data: ["POST", "PUT"].includes(method.toUpperCase())
            ? data
            : undefined,
        };

        const result = await api(config);
        setResponse(result.data);
        return result.data as T;
      } catch (err: any) {
        setError(err.response ? err.response.data : err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    response,
    sendRequest,
  };
};

export default useRequests;
