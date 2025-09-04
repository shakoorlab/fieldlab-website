import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  useMediaQuery,
  ButtonBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import phenodeImg from "../assets/tech/phenode.webp";
import sensorsImg from "../assets/tech/sensors.webp";
import fieldDockImg from "../assets/tech/fielddock.webp";
import rhizoImg from "../assets/tech/minirhizo.webp";

// ----------------------------------------------------------------------

export default function TechShowcase() {
  const theme = useTheme();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [active, setActive] = React.useState(0); // first orb card pre-hovered, -1 makes none active

  // Reset the active image when we drop below the breakpoint (stacked column)
  React.useEffect(() => {
    if (!isSmUp) setActive(-1);
  }, [isSmUp]);

  const items = [
    {
      title: "PheNode (Agrela Ecosystems)",
      blurb:
        "Solar-powered micro-weather and plant phenotyping node. Streams atmospheric & canopy context and acts as a local gateway.",
    },
    {
      title: "Wireless Soil & Environment Sensors",
      blurb:
        "LoRa-based probes for soil temperature & moisture and environmental conditions—low-power, field-scale coverage.",
    },
    {
      title: "FieldDock (Shakoor Lab)",
      blurb:
        "Lightweight edge gateway that aggregates research-grade instruments and forwards to NextG/MEC for real-time analytics.",
    },
    {
      title: "Minirhizotron Imaging",
      blurb:
        "Transparent tubes with a scanning camera to observe root architecture dynamics below ground—non-destructive, time-series.",
    },
  ];

  // Map which central image to show (only on sm and up)
  const center = isSmUp
    ? active === 0
      ? { src: phenodeImg, alt: "PheNode device" }
      : active === 1
      ? { src: sensorsImg, alt: "Wireless soil & environment sensors" }
      : active === 2
      ? { src: fieldDockImg, alt: "FieldDock gateway" }
      : active === 3
      ? { src: rhizoImg, alt: "Minirhizotron imaging" }
      : null
    : null;

  return (
    <Box
      id="technology"
      sx={{
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
        py: { xs: 8, md: 14 },
        overflow: "hidden",
      }}
    >
      <Container>
        <Stack spacing={{ xs: 2, md: 3 }} sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, opacity: 0.75 }}
          >
            Instrumentation
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 28, sm: 34 },
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            Deployment-ready technology at the plot edge
          </Typography>
          <Typography
            sx={{
              opacity: 0.9,
              maxWidth: 780,
              mx: "auto",
              alignSelf: "center",
            }}
          >
            We combine low-power LoRa sensors, imaging systems, and a
            field-hardened gateway to push data to 5G/MEC—so experiments can run
            at real-farm scales.
          </Typography>
        </Stack>

        <Box
          sx={{
            position: "relative",
            minHeight: { xs: "auto", sm: 520 },
            display: { xs: "flex", sm: "block" }, // stack below sm
            flexDirection: { xs: "column", sm: "initial" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          {/* Central Circle (hidden below sm) */}
          <Box
            sx={{
              display: { xs: "none", sm: "block" }, // hide circle below sm
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: { xs: 220, sm: 320, md: 380 },
              aspectRatio: "1/1",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.18)",
              // Keep your existing logo as a subtle fallback base
              backgroundImage: `url(/assets/logo_icon.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
              positionAnchor: "center",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.12), transparent 40%)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              },
            }}
          >
            {/* NEW: the swapping image layer. Fits inside the circle, responsive. */}
            {center && (
              <Box
                key={center.src}
                component="img"
                src={center.src}
                alt={center.alt}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  p: { xs: 2, sm: 2.5 }, // slight breathing room inside the circle
                  opacity: 0,
                  transform: "scale(0.985)",
                  animation: reduce ? "none" : "fadeIn 320ms ease forwards",
                  "@keyframes fadeIn": {
                    to: { opacity: 1, transform: "scale(1)" },
                  },
                }}
              />
            )}
          </Box>

          {/* Orbiting cards (absolute on sm+, stacked column below sm) */}
          {items.map((it, i) => (
            <OrbitCard
              key={i}
              index={i}
              active={active === i}
              title={it.title}
              blurb={it.blurb}
              reduce={reduce}
              onClick={() => setActive(i)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function OrbitCard({ index, active, title, blurb, reduce, onClick }) {
  // precomputed orbit positions for 4 cards
  const POS = [
    { x: -240, y: -150 },
    { x: 240, y: -150 },
    { x: -240, y: 140 },
    { x: 240, y: 140 },
  ];
  const { x, y } = POS[index] || { x: 0, y: 0 };
  const transformSm = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

  return (
    <ButtonBase
      onClick={onClick}
      focusRipple
      sx={{
        position: { xs: "static", sm: "absolute" },
        left: { sm: "50%" },
        top: { sm: "50%" },
        transform: { xs: "none", sm: transformSm },
        width: { xs: "100%", sm: 260 },
        textAlign: "left",
        borderRadius: 3,
        p: 2.2,
        outlineOffset: 4,
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.18)",
        transition:
          "box-shadow .35s ease, transform .45s ease, border-color .35s",
        boxShadow: active
          ? "0 0 0 4px rgba(96,173,94,0.10), 0 10px 40px rgba(0,0,0,0.45)"
          : "0 6px 24px rgba(0,0,0,0.35)",
        borderColor: active ? "#60ad5e" : "rgba(255,255,255,0.18)",
        mx: { xs: "auto", sm: 0 }, // center stacked cards
        mb: { xs: 2, sm: 0 }, // spacing between stacked cards
        "&:hover": {
          transform: { xs: "none", sm: `${transformSm} scale(1.02)` },
          borderColor: "#60ad5e",
        },
      }}
    >
      <Stack spacing={0.75}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>{blurb}</Typography>
        <Box
          aria-hidden
          sx={{
            mt: 0.5,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(96,173,94,0), rgba(96,173,94,0.9), rgba(96,173,94,0))",
            animation: reduce ? "none" : "pulse 2.2s ease-in-out infinite",
            "@keyframes pulse": {
              "0%,100%": { opacity: 0.3 },
              "50%": { opacity: 1 },
            },
          }}
        />
      </Stack>
    </ButtonBase>
  );
}
