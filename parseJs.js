import { readFile } from "fs";
import { rgbToHex } from "./cssConvert.js";

const colorObject = {};
const styleObject = {};

const showFileColors = (error, content) => {
  if (error) {
    console.log(error);
  }

  const split = content.split("\n");

  // to go through each line
  for (let i = 0; i < split.length; i += 1) {
    let sentence = split[i];

    if (sentence.indexOf("#") !== -1) {
      let style = sentence.slice(0, sentence.indexOf(":"));

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

      addToColorObject(color);
      addToStyleObject(style.trim());
    }

    if (sentence.indexOf("rgb(") !== -1) {
      let style = sentence.slice(0, sentence.indexOf(":"));

      sentence = sentence.slice(sentence.indexOf("rgb("));
      sentence = sentence.slice(0, sentence.indexOf(")"));
      sentence += ")";

      const color = rgbToHex(sentence);

      addToColorObject(color);
      addToStyleObject(style.trim());
    }
  }

  console.log('-------');
  console.log('colours:');
  console.log('-------');

  for (const color in colorObject) {
    console.log(`${color}: ${colorObject[color]}`);
  }

  console.log('-------');
  console.log('styles:');
  console.log('-------');

  for (const style in styleObject) {
    console.log(`${style}: ${styleObject[style]}`);
  }
};

const addToColorObject = (color) => {
  if (color.length !== 1) {
    if (colorObject[color] === undefined) {
      colorObject[color] = 1;
    } else {
      colorObject[color] += 1;
    }
  }
}

const addToStyleObject = (style) => {
  if (style.length !== 1) {
    if (styleObject[style] === undefined) {
      styleObject[style] = 1;
    } else {
      styleObject[style] += 1;
    }
  }
}

export const showColors = (fileName) => {
  readFile(fileName, "utf8", showFileColors);
};
