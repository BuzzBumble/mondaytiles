export const shortName = (str, len = 12, post = "...") => {
  if (str.length > len) str = str.substr(0, len) + post;
  return str;
};