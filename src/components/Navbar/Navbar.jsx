import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Slide,
  IconButton,
  Menu,
  MenuItem,
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

const NavLink = ({ children, href = "/" }) => (
  <Button
    component="a"
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

// Lightweight, dependency-free hamburger icon with an open/close state
const HamburgerIcon = ({ open = false }) => (
  <Box
    aria-hidden
    sx={{
      position: "relative",
      width: 22,
      height: 16,
      display: "inline-block",
      "&::before, &::after, & > span": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        height: 2,
        borderRadius: 1,
        bgcolor: "common.white",
        transition:
          "transform 200ms ease, opacity 200ms ease, top 200ms ease, bottom 200ms ease",
      },
      "&::before": {
        top: 0,
        transform: open ? "translateY(7px) rotate(45deg)" : "none",
      },
      "&::after": {
        bottom: 0,
        transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
      },
      "& > span": {
        top: "7px",
        opacity: open ? 0 : 1,
      },
    }}
  >
    <Box component="span" />
  </Box>
);

export default function Navbar() {
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const menuOpen = Boolean(menuAnchor);

  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const links = [
    { label: "About", href: "/#next-section" },
    { label: "Fields", href: "/#after-black-intro" },
    { label: "Technology", href: "/#technology" },
    { label: "Contact", href: "/#contact" },
  ];

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
          role="navigation"
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
            component={RouterLink}
            to="/"
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
                borderRadius: 0.5,
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
                fontSize: "clamp(14px, 2.2vw, 22px)",
                lineHeight: 1.1,
              }}
            >
              F I E L D L A B
            </Typography>
          </Box>

          {/* Desktop links (md and up) */}
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1 }}
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-end",
              ml: "auto",
              rowGap: { xs: 0.5, sm: 0.75 },
            }}
          >
            {links.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </Stack>

          {/* Mobile hamburger (sm and below) */}
          <IconButton
            aria-label="Open navigation menu"
            aria-controls={menuOpen ? "navbar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            onClick={openMenu}
            sx={{
              display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
              ml: "auto",
              color: "common.white",
              p: 1,
              borderRadius: 1.5,
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </IconButton>

          <Menu
            id="navbar-menu"
            anchorEl={menuAnchor}
            open={menuOpen}
            onClose={closeMenu}
            keepMounted
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1,
                borderRadius: "var(--radius)",
                border: "1px solid rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                color: "common.white",
                minWidth: 200,
                p: 0.5,
              },
            }}
            MenuListProps={{
              dense: true,
              disablePadding: true,
              sx: { p: 0.25 },
            }}
          >
            {links.map((l) => (
              <MenuItem
                key={l.href}
                component="a"
                href={l.href}
                onClick={closeMenu}
                sx={{
                  color: "common.white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1,
                  px: 1.25,
                  py: 1,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                {l.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </HideOnScroll>
    </Container>
  );
}
