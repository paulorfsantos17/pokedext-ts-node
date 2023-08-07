export function removeIDFromUrl(url: string): number {
  const urlParts = url.split('/');
  console.log(urlParts)
  const urlWithoutID = urlParts[6]

  return parseInt(urlWithoutID);
}
