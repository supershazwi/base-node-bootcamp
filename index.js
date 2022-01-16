import { showColors, showLint } from "./parseJs.js";
import {
  convertHexToRgb,
  convertRgbToHex,
  convertHexAndRgb,
} from "./parseJs.js";

// const filename = process.argv[3];
// const type = process.argv[2];

// if (type === "hextorgb") {
//   convertHexToRgb(filename);
// } else if (type === "rgbtohex") {
//   convertRgbToHex(filename);
// }

const filename = process.argv[2];
convertHexAndRgb(filename);
