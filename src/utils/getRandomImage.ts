export function getRandomImage(images: string[]): string {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
