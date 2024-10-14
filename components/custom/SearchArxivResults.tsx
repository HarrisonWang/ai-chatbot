"use client";

import cx from "classnames";
import { ChevronDown } from 'lucide-react';
import { useState } from "react";

interface ArxivResult {
  id: string;
  title: string;
  summary: string;
}

interface SearchArxivResultsProps {
  query: string;
  totalResults: number | 0;
  arxivEntries?: ArxivResult[] | null;
}

export function SearchArxivResults({ query, totalResults, arxivEntries }: SearchArxivResultsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          已搜索 {totalResults} 篇arXiv论文
        </h3>
        <ChevronDown className={cx(
          "h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300",
          isExpanded && "transform rotate-180"
        )} />
      </div>
      <div 
        className={cx(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-3 pb-3 pt-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-400 break-words">
            &quot;{query}&quot;
          </div>
          {!arxivEntries ? (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full size-8 border-y-2 border-gray-900 dark:border-gray-100"></div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">正在加载...</span>
            </div>
          ) : arxivEntries.length > 0 ? (
            arxivEntries.map((result, index) => (
              <div key={index} className="mb-3">
                <a href={`${result.id}`} className="text-blue-600 hover:underline text-sm font-medium break-words" target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-words">{result.summary}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">没有找到结果。</p>
          )}
        </div>
      </div>
    </div>
  );
}
