import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function BlackIntroSection() {
  const theme = useTheme();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = React.useRef(null);

  const [reveal, setReveal] = React.useState(false);
  const [currentChip, setCurrentChip] = React.useState(-1);
  const [maxLitChip, setMaxLitChip] = React.useState(-1);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReveal(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!reveal) return;

    const totalChips = 5; // <-- make sure this matches your number of ChipGlow items
    if (reduce) {
      setCurrentChip(totalChips - 1);
      setMaxLitChip(totalChips - 1);
      return;
    }

    const startDelay = 1000; // initial pause before the first chip
    const stepDelay = 2700; // gap between chips

    const timers = [];
    for (let k = 0; k < totalChips; k++) {
      timers.push(
        setTimeout(() => {
          setCurrentChip(k); // the one that pulses now
          setMaxLitChip((prev) => Math.max(prev, k)); // once lit, stays lit
        }, startDelay + k * stepDelay)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [reveal, reduce]);

  const chipColor = theme.palette.secondary?.light || "#60ad5e";

  return (
    <Box
      id="next-section"
      ref={ref}
      sx={{
        minHeight: "100vh",
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
        overflow: "hidden",
        clipPath: reveal ? "circle(140% at 50% 86%)" : "circle(0% at 50% 86%)",
        WebkitClipPath: reveal
          ? "circle(140% at 50% 86%)"
          : "circle(0% at 50% 86%)",
        transition:
          "clip-path 1100ms cubic-bezier(.22,.61,.36,1), -webkit-clip-path 1100ms cubic-bezier(.22,.61,.36,1)",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -200,
          pointerEvents: "none",
          opacity: 0.22,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          animation: "pan 24s linear infinite",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
        },
        "@keyframes pan": { to: { backgroundPosition: "0 100%" } },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&::after": { animation: "none" },
        },
      }}
    >
      <Container
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          py: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={{ xs: 2, sm: 3 }}
          sx={{ maxWidth: 960, textAlign: "center" }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, opacity: 0.75 }}
          >
            About FieldLab
          </Typography>

          <Typography
            sx={{
              fontSize: "clamp(18px, 2.1vw, 28px)",
              lineHeight: 1.45,
              fontWeight: 300,
              px: { xs: 1, sm: 2 },
              opacity: 0,
              transform: "translateY(8px)",
              animation: reveal ? "fadeUp 900ms 280ms ease forwards" : "none",
              "@keyframes fadeUp": {
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Box component="span" sx={{ opacity: 0.9 }}>
              FieldLab is pioneered by
            </Box>{" "}
            <ChipGlow
              on={0 <= maxLitChip}
              pulse={currentChip === 0}
              color={chipColor}
            >
              Dr. Nadia Shakoor
            </ChipGlow>{" "}
            and her team at the{" "}
            <ChipGlow
              on={1 <= maxLitChip}
              pulse={currentChip === 1}
              color={chipColor}
            >
              Donald Danforth Plant Science Center
            </ChipGlow>
            . Designed as a <i>living</i> laboratory, FieldLab brings together{" "}
            agriculture, technology, and connectivity to test and validate
            innovations like{" "}
            <ChipGlow
              on={2 <= maxLitChip}
              pulse={currentChip === 2}
              color={chipColor}
            >
              advanced sensors
            </ChipGlow>
            ,{" "}
            <ChipGlow
              on={3 <= maxLitChip}
              pulse={currentChip === 3}
              color={chipColor}
            >
              data analytics
            </ChipGlow>
            , and{" "}
            <ChipGlow
              on={4 <= maxLitChip}
              pulse={currentChip === 4}
              color={chipColor}
            >
              5G networks
            </ChipGlow>{" "}
            in real-world field conditions.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

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

function ChipGlow({
  children,
  on,
  pulse = false,
  color = "rgba(255,255,255,0.9)",
}) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        px: 0.6,
        py: 0.15,
        borderRadius: 999,
        border: "1px solid",
        borderColor: on ? color : "rgba(255,255,255,0.25)",
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
        boxShadow: on
          ? `0 0 0 4px ${rgba(color, 0.1)}, 0 0 12px ${rgba(color, 0.55)}`
          : "none",
        transition: "border-color .35s ease, box-shadow .45s ease",
        whiteSpace: "nowrap",
        animation: pulse ? "glowPulse 1.6s ease-in-out infinite" : "none",
        "@keyframes glowPulse": {
          "0%, 100%": {
            boxShadow: on
              ? `0 0 0 4px ${rgba(color, 0.08)}, 0 0 10px ${rgba(color, 0.45)}`
              : "none",
          },
          "50%": {
            boxShadow: on
              ? `0 0 0 6px ${rgba(color, 0.12)}, 0 0 16px ${rgba(color, 0.65)}`
              : "none",
          },
        },
      }}
    >
      {children}
    </Box>
  );
}

function rgba(hexOrColor, alpha) {
  if (
    typeof hexOrColor === "string" &&
    /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hexOrColor)
  ) {
    const [r, g, b] = hexToRgb(hexOrColor);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(255,255,255,${alpha})`;
}
function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
