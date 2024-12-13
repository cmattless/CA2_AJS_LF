import React from "react";
import api from "../config/api";
import { useToast } from "@/contexts/ToastContext";

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
	const showToast = useToast();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [response, setResponse] = React.useState<unknown>(null);

	/**
	 * Sends an HTTP request using the specified configuration.
	 *
	 * @template T - The expected response type.
	 * @param {IRequestConfig} config - The request configuration.
	 * @param {string} config.endpoint - The endpoint URL.
	 * @param {string} [config.method="GET"] - The HTTP method (e.g., "GET", "POST").
	 * @param {any} [config.data=null] - The request payload for methods like "POST" or "PUT".
	 * @param {Record<string, string>} [config.headers={}] - The request headers.
	 * @returns {Promise<T>} - A promise that resolves to the response data of type T.
	 * @throws Will throw an error if the request fails.
	 */
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
				showToast("Request Success!", "success", 3000);
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
