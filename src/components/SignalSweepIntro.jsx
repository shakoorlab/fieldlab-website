import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";

/**
 * Place <SignalSweepIntro /> right below your <Hero />.
 * It pins for ~200vh, shows a moving radial "5G signal" sweep,
 * and reveals sentences as the sweep passes.
 */
export default function SignalSweepIntro() {
  const wrapperRef = React.useRef(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [progress, setProgress] = React.useState(reduce ? 1 : 0); // 0..1 over the pinned sequence

  React.useEffect(() => {
    if (reduce) return setProgress(1);
    const el = wrapperRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      // When top hits viewport -> 0; when bottom hits -> 1
      const total = rect.height - window.innerHeight;
      const p = clamp(-rect.top / Math.max(total, 1), 0, 1);
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  // Position of the radial center as a percentage of the component height.
  // Starts slightly above the top (-15%) and exits past the bottom (~115%).
  const centerY = (-15 + 130 * progress).toFixed(2) + "%";

  // Sentence timings: feel free to tweak the windows
  const t1 = smoothstep(0.12, 0.34, progress); // sentence 1
  const t2 = smoothstep(0.4, 0.64, progress); // sentence 2
  const t3 = smoothstep(0.68, 0.92, progress); // sentence 3

  // Optional subtle grid strength as we progress
  const gridAlpha = 0.08 + 0.1 * t2; // faint at start, a tad brighter mid-way

  return (
    <Box
      ref={wrapperRef}
      sx={{
        height: { xs: "180vh", sm: "200vh" }, // scrolling room (pinned stage inside)
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
      }}
    >
      {/* Sticky stage */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          isolation: "isolate", // keep blend/masks scoped here
          backgroundColor: "common.black",
        }}
      >
        {/* Subtle sensor-ish dot grid */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: -200,
            opacity: gridAlpha,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            filter: "blur(0.2px)", // slight soften
            pointerEvents: "none",
          }}
        />

        {/* 5G signal sweep overlays (rings + soft core), driven by CSS variable */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            // A soft core + repeating rings, both centered at (50%, var(--y))
            backgroundImage: [
              // Core glow
              `radial-gradient(circle at 50% var(--y),
                rgba(255,255,255,0.12) 0%,
                rgba(255,255,255,0.08) 22%,
                rgba(255,255,255,0.03) 46%,
                rgba(255,255,255,0.00) 62%)`,
              // Rings (repeating)
              `repeating-radial-gradient(circle at 50% var(--y),
                rgba(255,255,255,0.18) 0px,
                rgba(255,255,255,0.18) 2px,
                rgba(255,255,255,0.00) 8px,
                rgba(255,255,255,0.00) 14px)`,
            ].join(", "),
            backgroundBlendMode: "screen",
            // Vertical vignette mask so the sweep fades at top/bottom
            maskImage:
              "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
            // in case you want the rings to drift slightly while scrolling:
            // backgroundPosition: `50% 0, 50% ${ (progress * 240).toFixed(1) }px`,
            "@media (prefers-reduced-motion: reduce)": {
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10), rgba(255,255,255,0.00) 60%)",
            },
          }}
          style={{ ["--y"]: centerY }}
        />

        {/* Content */}
        <Container
          sx={{
            height: "100%",
            display: "grid",
            placeItems: "center",
            position: "relative",
            zIndex: 1,
            px: { xs: 2, sm: 4 },
            textAlign: "center",
          }}
        >
          <Stack spacing={{ xs: 2, sm: 3 }} sx={{ maxWidth: 1000 }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 2,
                opacity: smoothstep(0.04, 0.16, progress),
                transform: `translateY(${
                  (1 - smoothstep(0.04, 0.16, progress)) * 10
                }px)`,
                transition: reduce
                  ? "none"
                  : "opacity 160ms ease, transform 160ms ease",
              }}
            >
              About FieldLab
            </Typography>

            {/* Sentence 1 */}
            <Typography
              sx={{
                fontSize: "clamp(18px, 2.1vw, 28px)",
                lineHeight: 1.5,
                fontWeight: 300,
                opacity: t1,
                transform: `translateY(${(1 - t1) * 10}px)`,
                transition: reduce
                  ? "none"
                  : "opacity 220ms ease, transform 220ms ease",
              }}
            >
              FieldLab is pioneered by <Em>Dr. Nadia Shakoor</Em> and her team
              at the <Em>Donald Danforth Plant Science Center</Em>.
            </Typography>

            {/* Sentence 2 */}
            <Typography
              sx={{
                fontSize: "clamp(18px, 2.1vw, 28px)",
                lineHeight: 1.5,
                fontWeight: 300,
                opacity: t2,
                transform: `translateY(${(1 - t2) * 10}px)`,
                transition: reduce
                  ? "none"
                  : "opacity 220ms ease, transform 220ms ease",
              }}
            >
              Designed as a <Em>living laboratory</Em>, FieldLab brings together{" "}
              <Em>agriculture</Em>, <Em>technology</Em>, and{" "}
              <Em>connectivity</Em>.
            </Typography>

            {/* Sentence 3 */}
            <Typography
              sx={{
                fontSize: "clamp(18px, 2.1vw, 28px)",
                lineHeight: 1.5,
                fontWeight: 300,
                opacity: t3,
                transform: `translateY(${(1 - t3) * 10}px)`,
                transition: reduce
                  ? "none"
                  : "opacity 220ms ease, transform 220ms ease",
              }}
            >
              It tests and validates innovations like <Em>advanced sensors</Em>,{" "}
              <Em>data analytics</Em>, and <Em>5G networks</Em> in real-world
              field conditions.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

/* ------ tiny helpers ------ */
function Em({ children }) {
  return (
    <Box
      component="span"
      sx={{
        textDecoration: "underline dotted",
        textUnderlineOffset: "0.22em",
        opacity: 0.95,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Box>
  );
}
function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}
function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}
