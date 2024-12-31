import React from "react";
import api from "../config/api";
import { useToast } from "@/contexts/ToastContext";
import { IRequest, IRequestConfig } from "@/types/hooks";

/**
 * Custom hook to handle API requests.
 */
const useRequests = <T,>(): IRequest<T> => {
	const showToast = useToast();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [response, setResponse] = React.useState<T | null>(null);


	/**
	 * Sends an HTTP request using the provided configuration.
	 *
	 * @template T - The expected response type.
	 * @param {IRequestConfig} config - The request configuration object.
	 * @param {string} config.endpoint - The endpoint URL for the request.
	 * @param {string} [config.method="GET"] - The HTTP method to use for the request.
	 * @param {any} [config.data=null] - The data to send with the request, if applicable.
	 * @param {Record<string, string>} [config.headers={}] - The headers to include with the request.
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
