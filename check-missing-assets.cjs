// check-missing-assets.js

const fs = require("fs");
const path = require("path");

const projectDir = path.resolve(__dirname, "src");
const validExtensions = [".jpg", ".jpeg", ".png", ".svg", ".webp", ".gif"];

const importRegex = /import\s+.*\s+from\s+['"](.+?\.(?:jpg|jpeg|png|svg|webp|gif))['"]/gi;

const scanFileForImports = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const matches = [...content.matchAll(importRegex)];
  return matches.map((match) => ({
    file: filePath,
    assetPath: match[1],
  }));
};

const getAllFiles = (dir, files = []) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx")) {
      files.push(fullPath);
    }
  });
  return files;
};

const checkAssets = () => {
  const files = getAllFiles(projectDir);
  let missing = [];

  files.forEach((file) => {
    const imports = scanFileForImports(file);
    imports.forEach(({ assetPath, file: sourceFile }) => {
      const resolvedPath = path.resolve(path.dirname(sourceFile), assetPath);
      if (!fs.existsSync(resolvedPath)) {
        missing.push({
          from: sourceFile.replace(projectDir + "/", ""),
          image: assetPath,
        });
      }
    });
  });

  if (missing.length === 0) {
    console.log("✅ All image assets are present!");
  } else {
    console.log("❌ Missing assets found:");
    missing.forEach((m) => {
      console.log(`→ Missing: ${m.image} (used in ${m.from})`);
    });
    process.exit(1); // exit with error code to block deploy if needed
  }
};

checkAssets();
