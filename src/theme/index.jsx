// Builds a single theme (palette, typography, breakpoints),
// applies CssBaseline, and defines GlobalStyles that set your responsive CSS variables in one place.

import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { brand, breakpoints, radii } from "./tokens";
import { makeComponents } from "./components";

function buildTheme(mode = "light") {
  // 1) Base theme (so we can reuse it when building component overrides)
  const base = createTheme({
    palette: {
      mode,
      primary: brand.primary,
      secondary: brand.secondary,
      background: {
        default: mode === "light" ? "#f7f8fa" : "#0b1220",
        paper: mode === "light" ? "#ffffff" : "#0f172a",
      },
      text: {
        primary: mode === "light" ? brand.grey[800] : "#e2e8f0",
        secondary: mode === "light" ? brand.grey[600] : brand.grey[400],
      },
      divider: mode === "light" ? brand.grey[200] : brand.grey[700],
      success: { main: "#2e7d32" },
      warning: { main: "#ed6c02" },
      error: { main: "#d32f2f" },
      info: { main: "#0288d1" },
    },

    breakpoints,

    shape: {
      // not responsive by itself, but we’ll route most radii via CSS vars below
      borderRadius: radii.sm,
    },

    spacing: 8, // 8px scale => theme.spacing(n)

    typography: {
      fontFamily: `'Inter Variable', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji`,
      h1: { fontWeight: 800, letterSpacing: -0.5 },
      h2: { fontWeight: 800, letterSpacing: -0.5 },
      h3: { fontWeight: 700, letterSpacing: -0.3 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      button: { fontWeight: 600 },
      body1: { lineHeight: 1.6 },
      body2: { lineHeight: 1.55 },
    },

    // You can also tune container widths here if you want:
    // components: { MuiContainer: { styleOverrides: { maxWidthLg: { maxWidth: 1120 }}}}
  });

  // 2) Add component defaults/overrides (they often need 'theme')
  let theme = createTheme(base, {
    components: makeComponents(base),
  });

  // 3) Make typography responsive
  theme = responsiveFontSizes(theme, { factor: 2.4 });

  return theme;
}

function GlobalResponsiveVars() {
  // Centralize responsive tokens with MUI breakpoints.
  // These are consumed by component overrides above.
  return (
    <GlobalStyles
      styles={(theme) => ({
        "*, *::before, *::after": { boxSizing: "border-box" },

        // Defaults (xs)
        ":root": {
          "--radius": `${radii.xs}px`,
          "--btn-py": theme.spacing(1.0), // vertical padding
          "--btn-px": theme.spacing(2.0), // horizontal padding
        },

        // ≥ sm
        [theme.breakpoints.up("sm")]: {
          ":root": {
            "--radius": `${radii.sm}px`,
            "--btn-py": theme.spacing(1.25),
            "--btn-px": theme.spacing(2.5),
          },
        },

        // ≥ md
        [theme.breakpoints.up("md")]: {
          ":root": {
            "--radius": `${radii.md}px`,
            "--btn-py": theme.spacing(1.5),
            "--btn-px": theme.spacing(3.0),
          },
        },

        // ≥ lg
        [theme.breakpoints.up("lg")]: {
          ":root": {
            "--radius": `${radii.lg}px`,
            "--btn-py": theme.spacing(1.75),
            "--btn-px": theme.spacing(3.5),
          },
        },
      })}
    />
  );
}

export function AppThemeProvider({ children }) {
  const theme = React.useMemo(() => buildTheme("light"), []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalResponsiveVars />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
