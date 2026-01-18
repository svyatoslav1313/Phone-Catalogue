const COLOR_MAP: Record<string, string> = {
  midnight: '#1d242e',
  sierrablue: '#3b7bd6ff',
  'sky blue': '#a1dcf8ff',
  graphite: 'gray',
  purple: '#daafefff',
  rosegold: '#f29daaff',
  'rose gold': '#f29daaff',
  spaceblack: '#393939ff',
  'space gray': 'gray',
  spacegray: 'gray',
  starlight: '#f6e6d4ff',
};

export function getColor(color: string) {
  return COLOR_MAP[color.toLowerCase()] || color;
}
