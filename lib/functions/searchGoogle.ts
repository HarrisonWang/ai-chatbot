import { z } from "zod";

const MAX_RETRIES = 3;

async function fetchWithRetry(url: string, retries = 0): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(`Retry attempt ${retries + 1} for ${url}`);
      return fetchWithRetry(url, retries + 1);
    }
    throw error;
  }
}

export const searchGoogle = {
  description: "Search Google",
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }: { query: string }) => {
    const googleKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    const serpApiKey = process.env.SERPAPI_KEY;

    const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
    const serpApiUrl = `https://serpapi.com/search?api_key=${serpApiKey}&q=${encodeURIComponent(query)}`;

    try {
      return await fetchWithRetry(googleUrl);
    } catch (googleError) {
      console.error("Google API 调用失败，尝试使用 SerpAPI");
      try {
        return await fetchWithRetry(serpApiUrl);
      } catch (serpApiError) {
        throw new Error("两个搜索 API 都失败了");
      }
    }
  },
};
