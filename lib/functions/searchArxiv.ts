import Parser from 'rss-parser';
import { z } from "zod";

const parser = new Parser({
  customFields: {
    feed: ['opensearch:totalResults', 'opensearch:startIndex', 'opensearch:itemsPerPage'],
    item: ['author', 'id', 'published', 'updated', 'summary', 'arxiv:primary_category']
  }
});

export const searchArxiv = {
  description: "Search for scientific papers and articles across various research fields on arXiv",
  parameters: z.object({
    query: z.string(),
    sortBy: z.enum(["relevance", "lastUpdatedDate", "submittedDate"]).optional(),
    sortOrder: z.enum(["ascending", "descending"]).optional(),
    start: z.number().optional(),
    maxResults: z.number().optional(),
  }),
  execute: async ({
    query,
    sortBy = "relevance",
    sortOrder = "descending",
    start = 0,
    maxResults = 3,
  }: {
    query: string;
    sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate";
    sortOrder?: "ascending" | "descending";
    start?: number;
    maxResults?: number;
  }) => {
    try {
      const params = new URLSearchParams({
        search_query: query,
        sortBy,
        sortOrder,
        start: start.toString(),
        max_results: maxResults.toString(),
      });

      const url = `https://export.arxiv.org/api/query?${params}`;
      const feed = await parser.parseURL(url);

      return {
        query,
        totalResults: feed.items.length,
        arxivEntries: feed.items.map((item: any) => ({
          id: item.id || '',
          title: item.title || '',
          summary: item.summary || '',
        }))
      };
    } catch (error) {
      console.error("arXiv搜索出错:", error);
      throw new Error("arXiv搜索失败");
    }
  },
};
