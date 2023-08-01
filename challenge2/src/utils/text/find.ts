/**
 * Find all urls in a text
 * @param text
 * @returns urls
 * @example findUrls('https://www.google.com') => ['https://www.google.com']
 */
export const findUrls = (text: string): string[] => {
  const regex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/g;
  const urls = text.match(regex) || [];
  return urls;
};
