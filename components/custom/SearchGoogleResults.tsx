"use client";

import cx from "classnames";
import { ChevronDown } from 'lucide-react';
import { useState } from "react";

interface SearchGoogleResult {
  title: string;
  url: string;
  snippet: string;
}

interface SearchGoogleResultsProps {
  query: string;
  results: SearchGoogleResult[];
}

export function SearchGoogleResults({ query, results }: SearchGoogleResultsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          已搜索 {results.length} 个网站
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
          {results.map((result, index) => (
            <div key={index} className="mb-3">
              <a href={result.url} className="text-blue-600 hover:underline text-sm break-words" target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-words">{result.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
