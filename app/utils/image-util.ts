export function getImageURL(name: string) {
  return new URL(name, import.meta.url).href;
}
