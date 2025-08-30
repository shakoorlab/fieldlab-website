// component defaultProps + styleOverrides in one place

export function makeComponents(theme) {
  return {
    MuiContainer: {
      defaultProps: {
        maxWidth: "false",
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          // global responsive sizing via CSS vars
          borderRadius: "calc(var(--radius) - 2px)",
          padding: "var(--btn-py) var(--btn-px)",
          textTransform: "none",
          fontWeight: 600,
        },
        sizeSmall: {
          // slight scale for explicit 'small'
          padding: `calc(var(--btn-py) - 2px) calc(var(--btn-px) - 4px)`,
        },
        sizeLarge: {
          padding: `calc(var(--btn-py) + 2px) calc(var(--btn-px) + 4px)`,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "calc(var(--radius) - 4px)",
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: "var(--radius)",
          backgroundImage: "none", // cleaner, flat surfaces
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "var(--radius)",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "calc(var(--radius) - 2px)",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          transition: theme.transitions.create("color", { duration: 150 }),
        },
      },
    },
  };
}
