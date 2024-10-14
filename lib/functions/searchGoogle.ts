import { z } from "zod";

export const searchGoogle = {
  description: "Search Google",
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }: { query: string }) => {
    // const key = "AIzaSyAVPRCrKWQA3Rp0jypB2gnkH_Erc53Sd90";
    // const searchEngineId = "54e81490052da4f21";
    // const searchEngineName = "voy";

    // const response = await fetch(
    //   `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${searchEngineId}:${searchEngineName}&q=${query}`,
    // );

    const apiKey = "cc4602bfb6cbf5c507f020c7cbb703398818d55424b1f4c7e551383c86a8dfb8";
    const response = await fetch(
      `https://serpapi.com/search?api_key=${apiKey}&q=${query}`,
    );
    const searchData = await response.json();
    return searchData;
  },
};
