
export interface IRequestConfig {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: Record<Array, Object> | null;
    headers?: Record<string, string>;
}

export interface IRequest<T> {
    loading: boolean;
    error: string | null;
    response: T | null
    sendRequest: <T>(config: IRequestConfig) => Promise<T>;
}

export interface IErrorType {
    error: string;
}