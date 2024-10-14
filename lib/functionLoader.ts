import fs from 'fs/promises';
import path from 'path';

export async function loadAllFunctions() {
  const functions: { [key: string]: Function } = {};
  const functionsDir = path.join(process.cwd(), 'lib', 'functions');
  const functionFiles = await fs.readdir(functionsDir);

  for (const file of functionFiles) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const functionName = path.parse(file).name;
      // 使用相对路径进行导入
      const importedModule = await import(`./functions/${file}`);
      functions[functionName] = importedModule[functionName];
    }
  }

  return functions;
}
