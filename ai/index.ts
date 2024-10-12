import { createOpenAI  } from "@ai-sdk/openai";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

import { customMiddleware } from "./custom-middleware";

// 创建自定义的 OpenAI 提供者实例
const customOpenAI = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
  // 可以根据需要添加其他选项
})

export const customModel = wrapLanguageModel({
  model: customOpenAI("gpt-4o"),
  middleware: customMiddleware,
});
