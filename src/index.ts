import { getInput, setFailed } from "@actions/core";
import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const version = getInput("version");
const packageJsonPath = getInput("package-json-path") || resolve(__dirname, "../package.json");

if(!existsSync(packageJsonPath)) {
    setFailed(`File not found: ${packageJsonPath}`);
}

const pack = require(packageJsonPath); 

if(!pack) {
    setFailed(`Failed to load package.json from ${packageJsonPath}`);
}

pack.version = version;

try {
    writeFileSync(packageJsonPath, JSON.stringify(pack, null, 2));
}
catch(error) {
    setFailed(`Failed to write package.json: ${error}`);
}