import { showColors, showLint } from "./parseJs.js";
import { convertHexToRgb, convertRgbToHex } from "./parseJs.js";

const filename = process.argv[3];
const type = process.argv[2];

// showColors(filename);
// showLint(filename);

if (type === "hextorgb") {
  convertHexToRgb(filename);
} else if (type === "rgbtohex") {
  convertRgbToHex(filename);
}
