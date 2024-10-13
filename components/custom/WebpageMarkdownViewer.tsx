"use client";

import { useState, useRef, useEffect } from "react";
import cx from "classnames";
import { ChevronDown } from 'lucide-react';

import { Markdown } from "./markdown";

interface WebpageMarkdownViewerProps {
  data?: string;
}

export function WebpageMarkdownViewer({ data }: WebpageMarkdownViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isExpanded]);

  if (!data) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 rounded-lg"></div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          网页 Markdown 内容
        </h3>
        <ChevronDown className={cx(
          "h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300",
          isExpanded && "transform rotate-180"
        )} />
      </div>
      <div 
        ref={contentRef}
        className={cx(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-3 pb-3 pt-1 text-sm text-gray-600 dark:text-gray-400">
          <Markdown>{data}</Markdown>
        </div>
      </div>
    </div>
  );
}
