export const bumpHexColor = (hex, amt) => {
  const colorInt = parseInt(hex.slice[1], 16);

  let r = (colorInt >> 16) + amt;
  if (r > 255) r = 255;
  if (r < 0) r = 0;

  let g = ((colorInt >> 8) & 0x00FF) + amt;
  if (g > 255) g = 255;
  if (g < 0) g = 0;

  let b = (colorInt & 0x0000FF) + amt;
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

  const minOffset = -40;
  const maxOffset = -5;

  const colorRange = maxOffset - minOffset;

  const maxColor = bumpHexColor(hex, -5);

  if (weight === 1) return maxColor;

  const minColor = bumpHexColor(hex, -40);
  const weightOffset = Math.floor(colorRange * weight);
  
  return bumpHexColor(minColor, weightOffset);
}