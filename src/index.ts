import core from "@actions/core";
import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const version = core.getInput("version");
const packageJsonPath = core.getInput("package-json-path") || resolve(__dirname, "../package.json");

if(!existsSync(packageJsonPath)) {
    core.setFailed(`File not found: ${packageJsonPath}`);
}

const pack = require(packageJsonPath); 

if(!pack) {
    core.setFailed(`Failed to load package.json from ${packageJsonPath}`);
}

pack.version = version;

try {
    writeFileSync(packageJsonPath, JSON.stringify(pack, null, 2));
}
catch(error) {
    core.setFailed(`Failed to write package.json: ${error}`);
}