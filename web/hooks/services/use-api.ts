import { useAuth } from "@clerk/nextjs";
import { config } from "@/lib/config";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

export const useApi = () => {
  const { getToken } = useAuth();
  const baseURL = config.api.baseUrl;

  return async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const token = await getToken();

    const response = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail || "API Request Failed";

      logger.error(`[API ${response.status}] ${endpoint}`, errorData);
      toast.error(errorMessage);
      
      throw new Error(errorMessage);
    }

    const data = response.status === 204 ? null : await response.json();
    return data as T;
  };
};
