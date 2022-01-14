import { readFile } from "fs";
import { rgbToHex } from "./cssConvert.js";

const colorObject = {};

const showFileColors = (error, content) => {
  if (error) {
    console.log(error);
  }

  const split = content.split("\n");

  // to go through each line
  for (let i = 0; i < split.length; i += 1) {
    let sentence = split[i];

    if (sentence.indexOf("#") !== -1) {
      // this is a function
      const hashIndex = sentence.indexOf("#");
      let color = sentence.slice(hashIndex, sentence.indexOf(";"));

      const spaceIndex = color.indexOf(" ");

      if (spaceIndex !== -1) {
        color = color.slice(0, spaceIndex);
      }

      const commaIndex = color.indexOf(",");

      if (commaIndex !== -1) {
        color = color.slice(0, commaIndex);
      }

      if (color.length !== 1) {
        if (colorObject[color] === undefined) {
          colorObject[color] = 1;
        } else {
          colorObject[color] += 1;
        }
      }
    }

    if (sentence.indexOf("rgb(") !== -1) {
      sentence = sentence.slice(sentence.indexOf("rgb("));
      sentence = sentence.slice(0, sentence.indexOf(")"));
      sentence += ")";

      const color = rgbToHex(sentence);

      if (color.length !== 1) {
        if (colorObject[color] === undefined) {
          colorObject[color] = 1;
        } else {
          colorObject[color] += 1;
        }
      }
    }
  }

  for (const color in colorObject) {
    console.log(`${color}: ${colorObject[color]}`);
  }
};

export const showColors = (fileName) => {
  readFile(fileName, "utf8", showFileColors);
};
