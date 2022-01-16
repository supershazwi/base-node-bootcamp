const decToHex = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "a",
  11: "b",
  12: "c",
  13: "d",
  14: "e",
  15: "f",
};

export const hexToRgb = (hex) => {
  console.log("converting hex to rgb...");
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (rgb) => {
  console.log("converting rgb to hex...");
  rgb = rgb.slice(4, -1);
  const rgbPortions = rgb.split(",");
  let result = "#";

  for (let i = 0; i < rgbPortions.length; i += 1) {
    result += decToHex[Math.floor(rgbPortions[i] / 16)];
    result +=
      decToHex[(rgbPortions[i] / 16 - Math.floor(rgbPortions[i] / 16)) * 16];
  }

  return result;
};
