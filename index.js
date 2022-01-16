import { showColors, showLint } from "./parseJs.js";
import { convertHexToRgb } from "./parseJs.js";

const filename = process.argv[2];

// showColors(filename);
// showLint(filename);
convertHexToRgb(filename);
