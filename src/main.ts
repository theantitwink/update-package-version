import { argv } from "process";
import { writeFileSync } from "fs";
import { resolve } from "path";
const packageJsonPath = resolve(__dirname, "../package.json");
const pack = require(packageJsonPath); // Use dynamic require

pack.version = argv[2];
writeFileSync(packageJsonPath, JSON.stringify(pack, null, 2));
