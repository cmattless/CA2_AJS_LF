import axios from "axios";

let baseUrl = "https://loreforge.vercel.app/api";

const api = axios.create({
	baseURL: baseUrl,
});

export default api;
