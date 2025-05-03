const themes = ['dark', 'light', 'system'] as const;

export const isTheme = (value: unknown): value is Theme => {
  if (typeof value !== 'string') return false;

  return themes.some((theme): theme is Theme => theme === value);
};

export type Theme = (typeof themes)[number];
