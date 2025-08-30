import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";

/**
 * A scrollytelling section:
 * - Outer wrapper is ~200vh tall so the inner (sticky) scene can animate while "pinned".
 * - SVG draws a faint dot grid and 3 connecting lines that "draw" in sequence.
 * - Key phrases in the paragraph highlight as the lines complete.
 */
export default function SensorGridConnect() {
  const wrapperRef = React.useRef(null);
  const theme = useTheme();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [progress, setProgress] = React.useState(reduce ? 1 : 0); // 0..1 across the pinned sequence

  React.useEffect(() => {
    if (reduce) return setProgress(1);
    const el = wrapperRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight; // the scrollable distance while pinned
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

  // ---- Grid + Lines config (viewBox is 0..100 both axes for responsiveness)
  const gridX = [10, 30, 50, 70, 90];
  const gridY = [15, 35, 55, 75, 90];

  // 3 segments that will draw in sequence across progress [0..1]
  const segments = [
    { from: [12, 78], to: [36, 52], range: [0.0, 0.33] }, // sensors -> research
    { from: [36, 52], to: [62, 36], range: [0.33, 0.66] }, // research -> data
    { from: [62, 36], to: [86, 22], range: [0.66, 0.95] }, // data -> 5G
  ];

  // Precompute line lengths (in viewBox units)
  const lineInfo = React.useMemo(
    () =>
      segments.map((s) => {
        const len = lineLength(s.from, s.to);
        return { ...s, len };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Highlight visibility keyed to segment completion
  const seg1T = segmentT(progress, segments[0].range);
  const seg2T = segmentT(progress, segments[1].range);
  const seg3T = segmentT(progress, segments[2].range);

  const highlight1 = seg1T > 0.85 || progress >= 0.66; // Dr. Nadia Shakoor
  const highlight2 = seg2T > 0.85 || progress >= 0.9; // Donald Danforth...
  const highlight3 = seg3T > 0.25 || progress >= 0.95; // 5G networks (earlier pop)

  // Paragraph resolves near the end
  const resolveT = smoothstep(0.8, 1.0, progress);

  return (
    <Box
      id="next-section" // your scroll target
      ref={wrapperRef}
      sx={{
        height: { xs: "180vh", sm: "200vh" }, // scrolling room
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
      }}
    >
      {/* Sticky viewport scene */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* SVG grid + animated lines */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.85,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Dot grid */}
            {gridY.map((y) =>
              gridX.map((x) => (
                <circle
                  key={`d-${x}-${y}`}
                  cx={x}
                  cy={y}
                  r={0.6}
                  fill="rgba(255,255,255,0.18)"
                />
              ))
            )}

            {/* Animated connecting lines */}
            {lineInfo.map((ln, i) => {
              const t = segmentT(progress, ln.range); // 0..1 for this segment
              const dash = ln.len;
              const stroke = "rgba(255,255,255,0.7)";
              return (
                <line
                  key={`l-${i}`}
                  x1={ln.from[0]}
                  y1={ln.from[1]}
                  x2={ln.to[0]}
                  y2={ln.to[1]}
                  stroke={stroke}
                  strokeWidth={0.75}
                  strokeLinecap="round"
                  strokeDasharray={dash}
                  strokeDashoffset={(1 - t) * dash}
                  style={{
                    transition: reduce
                      ? "none"
                      : "stroke-dashoffset 40ms linear",
                    filter:
                      i === 2 && t > 0.2
                        ? "drop-shadow(0 0 4px rgba(255,255,255,0.35))"
                        : "none",
                  }}
                />
              );
            })}

            {/* Pulse nodes where segments land */}
            {[
              { p: segments[0].from, t: seg1T },
              { p: segments[0].to, t: seg1T },
              { p: segments[1].to, t: seg2T },
              { p: segments[2].to, t: seg3T },
            ].map(({ p, t }, i) => (
              <circle
                key={`p-${i}`}
                cx={p[0]}
                cy={p[1]}
                r={1.2 + 0.8 * easeOut(t)}
                fill="rgba(255,255,255,0.12)"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={t > 0 ? 0.2 : 0}
                style={{ transition: reduce ? "none" : "all 240ms ease" }}
              />
            ))}
          </svg>
        </Box>

        {/* Content */}
        <Container
          sx={{
            height: "100%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            px: { xs: 2, sm: 4 },
          }}
        >
          <Stack spacing={{ xs: 2, sm: 3 }} sx={{ maxWidth: 980 }}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 2,
                opacity: 0.75,
                transform: `translateY(${
                  (1 - smoothstep(0.05, 0.15, progress)) * 10
                }px)`,
                transition: reduce ? "none" : "transform 180ms ease",
              }}
            >
              About FieldLab
            </Typography>

            <Typography
              sx={{
                fontSize: "clamp(18px, 2.1vw, 28px)",
                lineHeight: 1.5,
                fontWeight: 300,
                opacity: resolveT,
                transform: `translateY(${(1 - resolveT) * 8}px)`,
                transition: reduce
                  ? "none"
                  : "opacity 280ms ease, transform 280ms ease",
              }}
            >
              FieldLab is pioneered by{" "}
              <ChipGlow on={highlight1} color={theme.palette.secondary?.main}>
                Dr. Nadia Shakoor
              </ChipGlow>{" "}
              and her team at the{" "}
              <ChipGlow on={highlight2} color="rgba(255,255,255,0.85)">
                Donald Danforth Plant Science Center
              </ChipGlow>
              . Designed as a <Em>living laboratory</Em>, FieldLab brings
              together <Em>agriculture</Em>, <Em>technology</Em>, and{" "}
              <Em>connectivity</Em> to test and validate innovations like{" "}
              <Em>advanced sensors</Em>, <Em>data analytics</Em>, and{" "}
              <ChipGlow
                on={highlight3}
                color={theme.palette.secondary?.light || "#60ad5e"}
              >
                5G networks
              </ChipGlow>{" "}
              in real-world field conditions.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

/* ---------- Tiny styled helpers ---------- */

function ChipGlow({ children, on, color = "rgba(255,255,255,0.9)" }) {
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
      }}
    >
      {children}
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
      }}
    >
      {children}
    </Box>
  );
}

/* ---------- Math + utils ---------- */

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}
function easeOut(t) {
  // easeOutCubic
  return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
}
function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}
function segmentT(p, [start, end]) {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}
function lineLength([x1, y1], [x2, y2]) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.hypot(dx, dy);
}
function rgba(hexOrColor, alpha) {
  // Accepts hex (#rrggbb) or css color; if hex, add alpha; else fall back to rgba(255,255,255,a)
  if (
    typeof hexOrColor === "string" &&
    /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(hexOrColor)
  ) {
    const [r, g, b] = hexToRgb(hexOrColor);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(255,255,255,${alpha})`;
}
function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const bigint = parseInt(h, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
