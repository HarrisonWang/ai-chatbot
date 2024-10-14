import { z } from "zod";

export const getWebpageMarkdown = {
  description: "Get the markdown content of a webpage",
  parameters: z.object({
    url: z.string().url(),
  }),
  execute: async ({ url }: { url: string }) => {
    const response = await fetch(`http://r.jina.ai/${url}`);
    return await response.text();
  },
};