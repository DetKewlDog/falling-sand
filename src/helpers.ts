function hexToHsl(hex: string) {
  // Remove the hash character, if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values to RGB
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Normalize RGB values to the range [0, 1]
  let normalizedR = r / 255;
  let normalizedG = g / 255;
  let normalizedB = b / 255;

  // Find the maximum and minimum values among the RGB components
  let max = Math.max(normalizedR, normalizedG, normalizedB);
  let min = Math.min(normalizedR, normalizedG, normalizedB);

  // Calculate the lightness (L) value
  let lightness = (max + min) / 2;

  // Calculate the saturation (S) value
  let saturation = 0;
  if (max !== min) {
      saturation = lightness <= 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
  }

  // Calculate the hue (H) value
  let hue = 0;
  if (max === normalizedR) {
    hue = ((normalizedG - normalizedB) / (max - min) + 6) % 6;
  } else if (max === normalizedG) {
    hue = (normalizedB - normalizedR) / (max - min) + 2;
  } else if (max === normalizedB) {
    hue = (normalizedR - normalizedG) / (max - min) + 4;
  }

  // Convert hue to degrees
  hue *= 60;

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100)
  };
}

export function randomColor(color: string, alpha: number) {
  const { h, s, l } = hexToHsl(color);

  let saturation = s + Math.floor(Math.random() * -20);
  saturation = Math.max(0, Math.min(saturation, 100));
  let lightness = l + Math.floor(Math.random() * 20 - 10);
  lightness = Math.max(0, Math.min(lightness, 100));
  return `hsla(${h}, ${saturation}%, ${lightness}%, ${alpha})`;
}

export function hexToRGB(hex: string, alpha: number = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return alpha
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgb(${r}, ${g}, ${b})`;
}