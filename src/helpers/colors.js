export const lightenHexColor = (hex, rAmt, gAmt, bAmt) => {
  const colorInt = parseInt(hex.slice(1), 16);

  let r = (colorInt >> 16) + rAmt;
  if (r > 255) r = 255;
  if (r < 0) r = 0;

  let g = ((colorInt >> 8) & 0x00FF) + gAmt;
  if (g > 255) g = 255;
  if (g < 0) g = 0;

  let b = (colorInt & 0x0000FF) + bAmt;
  if (b > 255) b = 255;
  if (b < 0) b = 0;

  const res = (r << 16) | (g << 8) | b;
  return "#" + res.toString(16);
}

export const getColorVariant = (hex, weight) => {
  if (hex[0] !== "#") {
    console.log(hex, "is not a hex value");
    return hex;
  }

  const colorInt = parseInt(hex.slice(1), 16);

  const maxR = 255;
  const maxG = 255;
  const maxB = 255;

  const r = colorInt >> 16;
  const g = (colorInt >> 8) & 0x00FF;
  const b = colorInt & 0x0000FF;

  const flippedWeight = 1 - weight + 0.1;

  const maxVariation = 0.65;

  const rDiff = (maxR - r) * maxVariation;
  const gDiff = (maxG - g) * maxVariation;
  const bDiff = (maxB - b) * maxVariation;

  const rValue = Math.floor(rDiff * flippedWeight);
  const gValue = Math.floor(gDiff * flippedWeight);
  const bValue = Math.floor(bDiff * flippedWeight);

  return lightenHexColor(hex, rValue, gValue, bValue); 
}