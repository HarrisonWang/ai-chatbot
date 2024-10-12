"use client";

import cx from "classnames";

import { Markdown } from "./markdown";

interface WebpageMarkdownViewerProps {
  data?: string;
}

export function WebpageMarkdownViewer({ data }: WebpageMarkdownViewerProps) {
  if (!data) {
    return (
      <div className={cx(
        "flex flex-col gap-4 rounded-2xl p-4 skeleton-bg",
        "bg-gray-200 dark:bg-gray-700"
      )}>
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    );
  }

  return (
    <div className={cx(
      "flex flex-col gap-4 rounded-2xl p-4",
      "bg-gray-100 dark:bg-gray-800"
    )}>
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl font-medium text-gray-800 dark:text-gray-200">
          网页 Markdown 内容
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto text-gray-700 dark:text-gray-300">
        <Markdown>{data}</Markdown>
      </div>
    </div>
  );
}
