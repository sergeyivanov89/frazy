import { HOST } from "@/constants";

const api = async (path: string, method = "get", data = undefined) => {
  const response = await fetch(`${HOST}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return await response.json();
};

export default api;
