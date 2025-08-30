// (optional) central color tokens, etc.

export const brand = {
  primary: {
    main: "#208e38ff",
    light: "#4dabf5",
    dark: "#003c8f",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#2e7d32",
    light: "#60ad5e",
    dark: "#005005",
    contrastText: "#ffffff",
  },
  // greys useful for borders, backgrounds, text
  grey: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1f2937",
    900: "#0f172a",
  },
};

export const breakpoints = {
  // add custom breakpoints here if you need them
  values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, customXL: 1840 },
};

// “design tokens” you’ll reuse for responsive sizing
export const radii = { xs: 8, sm: 10, md: 12, lg: 14 }; // global corner rounding
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }; // global spacing unit
export const fontSizes = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 }; // global font sizes
