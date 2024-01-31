import { HOST } from "@/constants";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const api = async (path: string, method = "get", data = undefined) => {
  await delay();
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
