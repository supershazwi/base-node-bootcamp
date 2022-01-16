import { readFile, writeFile } from "fs";
import { rgbToHex, hexToRgb } from "./cssConvert.js";

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

  console.log("-------");
  console.log("colours:");
  console.log("-------");

  for (const color in colorObject) {
    console.log(`${color}: ${colorObject[color]}`);
  }

  console.log("-------");
  console.log("styles:");
  console.log("-------");

  for (const style in styleObject) {
    console.log(`${style}: ${styleObject[style]}`);
  }
};

const showFileLint = (error, content) => {
  if (error) {
    console.log(error);
  }

  const split = content.split("\n");

  let checkSemicolon = false;

  const semiColonErrorLines = [];

  // to go through each line
  for (let i = 0; i < split.length; i += 1) {
    let sentence = split[i];
    if (checkSemicolon === false && sentence.indexOf("{") !== -1) {
      checkSemicolon = true;
    } else if (checkSemicolon === true && sentence.indexOf("}") !== -1) {
      checkSemicolon = false;
    } else if (checkSemicolon === true) {
      if (
        sentence[sentence.length - 2] !== "," &&
        sentence[sentence.length - 2] !== ";"
      ) {
        semiColonErrorLines.push(i + 1);
      }
    }
  }

  console.log("-------");
  console.log("semi colons missing on lines:");
  console.log("-------");

  for (let i = 0; i < semiColonErrorLines.length; i += 1) {
    console.log(`Line ${semiColonErrorLines[i]}`);
  }
};

const handleFileWrite = (err) => {
  if (err) {
    console.log(err);
    return;
  }
  // If no error, file written successfully
  console.log("success!");
};

const convertHexToRgbFile = (error, content) => {
  if (error) {
    console.log(error);
  }

  const split = content.split("\n");

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

      const rgb = hexToRgb(color);

      split[i] = `${style}: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`;
    }
  }

  writeFile("styles.css", split.join("\n"), handleFileWrite);
};

const convertRgbToHexFile = (error, content) => {
  if (error) {
    console.log(error);
  }

  const split = content.split("\n");

  for (let i = 0; i < split.length; i += 1) {
    let sentence = split[i];

    if (sentence.indexOf("rgb(") !== -1) {
      let style = sentence.slice(0, sentence.indexOf(":"));

      // this is a function
      const rgbIndex = sentence.indexOf("rgb(");

      let color = sentence.slice(rgbIndex, sentence.indexOf(";"));

      const hex = rgbToHex(color);

      split[i] = `${style}: ${hex};`;
    }
  }

  writeFile("styles.css", split.join("\n"), handleFileWrite);
};

const convertHexAndRgbFile = (error, content) => {
  if (error) {
    console.log(error);
  }

  const split = content.split("\n");

  for (let i = 0; i < split.length; i += 1) {
    let sentence = split[i];

    if (sentence.indexOf("rgb(") !== -1) {
      let style = sentence.slice(0, sentence.indexOf(":"));

      // this is a function
      const rgbIndex = sentence.indexOf("rgb(");

      let color = sentence.slice(rgbIndex, sentence.indexOf(";"));

      const hex = rgbToHex(color);

      split[i] = `${style}: ${hex};`;
    } else if (sentence.indexOf("#") !== -1) {
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

      const rgb = hexToRgb(color);

      split[i] = `${style}: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`;
    }
  }

  writeFile("styles.css", split.join("\n"), handleFileWrite);
};

const addToColorObject = (color) => {
  if (color.length !== 1) {
    if (colorObject[color] === undefined) {
      colorObject[color] = 1;
    } else {
      colorObject[color] += 1;
    }
  }
};

const addToStyleObject = (style) => {
  if (style.length !== 1) {
    if (styleObject[style] === undefined) {
      styleObject[style] = 1;
    } else {
      styleObject[style] += 1;
    }
  }
};

export const showColors = (fileName) => {
  readFile(fileName, "utf8", showFileColors);
};

export const showLint = (fileName) => {
  readFile(fileName, "utf8", showFileLint);
};

export const convertHexToRgb = (fileName) => {
  readFile(fileName, "utf8", convertHexToRgbFile);
};

export const convertRgbToHex = (fileName) => {
  readFile(fileName, "utf8", convertRgbToHexFile);
};

export const convertHexAndRgb = (fileName) => {
  readFile(fileName, "utf8", convertHexAndRgbFile);
};
