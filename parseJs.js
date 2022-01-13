import { readFile } from "fs";

const colorObject = {};

const showFileColors = (error, content) => {
  if (error) {
    console.log(error);
  }

  const split = content.split("\n");

  // to go through each line
  for (let i = 0; i < split.length; i += 1) {
    const sentence = split[i];

    if (sentence.indexOf("color") !== -1) {
      // this is a function
      const hashIndex = sentence.indexOf("#");
      const color = sentence.slice(hashIndex, sentence.indexOf(";"));

      if (colorObject[color] === undefined) {
        colorObject[color] = 1;
      } else {
        colorObject[color] += 1;
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
