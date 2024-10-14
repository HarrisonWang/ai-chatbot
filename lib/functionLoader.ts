import fs from 'fs/promises';
import path from 'path';

import { CoreTool } from 'ai';

export async function loadAllFunctions(): Promise<Record<string, CoreTool<any, any>>> {
  const functions: Record<string, CoreTool<any, any>> = {};
  const functionsDir = path.join(process.cwd(), 'lib', 'functions');
  const functionFiles = await fs.readdir(functionsDir);

  for (const file of functionFiles) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const functionName = path.parse(file).name;
      const importedModule = await import(`./functions/${file}`);
      if (typeof importedModule[functionName] === 'object' && importedModule[functionName].parameters) {
        functions[functionName] = importedModule[functionName] as CoreTool<any, any>;
      }
    }
  }

  return functions;
}
