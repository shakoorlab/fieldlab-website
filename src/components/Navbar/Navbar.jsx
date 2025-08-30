import * as React from "react";

import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Slide,
  useScrollTrigger,
} from "@mui/material";

import logoIcon from "../../assets/logo_icon.png";

function HideOnScroll({ children }) {
  const [hide, setHide] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // hide when scrolling down, show when scrolling up
      if (Math.abs(delta) > 4) {
        setHide(delta > 0 && y > 8);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Slide appear={false} direction="down" in={!hide}>
      {children}
    </Slide>
  );
}

const NavLink = ({ children, href = "#" }) => (
  <Button
    href={href}
    variant="text"
    size="small"
    sx={{
      color: "common.white",
      px: { xs: 1, sm: 1.5 },
      minWidth: "auto",
      fontWeight: 600,
      textTransform: "none",
      "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
    }}
  >
    {children}
  </Button>
);

export default function Navbar() {
  return (
    <Container
      sx={{
        position: "relative",
        zIndex: 2,
        pt: { xs: 2.5, sm: 3 },
      }}
    >
      <HideOnScroll>
        <Box
          component="nav"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 1.25, sm: 1.75 },
            py: { xs: 0.75, sm: 1 },
            borderRadius: "var(--radius)",
            border: "1px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          {/* Brand (icon + text) */}
          <Box
            component="a"
            href="/"
            aria-label="FieldLab home"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.25 },
              textDecoration: "none",
              color: "common.white",
              flexShrink: 0, // don't let the brand squish
              "&:hover": { opacity: 0.9 },
            }}
          >
            {/* Favicon: 1em-based sizing keeps it in sync with text */}
            <Box
              component="img"
              src={logoIcon}
              alt="FieldLab logo"
              loading="lazy"
              decoding="async"
              sx={{
                width: "1.25em",
                height: "1.25em",
                display: "block",
                objectFit: "contain",
                // optional subtle rounding for favicons that look harsh at tiny sizes
                borderRadius: 0.5,
                // make sure it still scales down at the tiniest screens
                maxWidth: { xs: "1.3em", sm: "1.25em" },
                maxHeight: { xs: "1.3em", sm: "1.25em" },
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Pretendard",
                color: "common.white",
                fontWeight: 500,
                letterSpacing: 0.3,
                userSelect: "none",
                whiteSpace: "nowrap",
                // Smoothly responsive: scales with viewport but stays within sensible bounds
                fontSize: "clamp(14px, 2.2vw, 22px)",
                lineHeight: 1.1,
              }}
            >
              F I E L D L A B
            </Typography>
          </Box>

          {/* Links */}
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1 }}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-end",
              ml: "auto",
              rowGap: { xs: 0.5, sm: 0.75 },
            }}
          >
            <NavLink>Home</NavLink>
            <NavLink>Fields</NavLink>
            <NavLink>Technology</NavLink>
            <NavLink>Contact</NavLink>
          </Stack>
        </Box>
      </HideOnScroll>
    </Container>
  );
}
