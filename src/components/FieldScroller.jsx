import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Chip,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FieldScroller() {
  const theme = useTheme();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [revealed, setRevealed] = React.useState(false); // first-time reveal control

  const containerRef = React.useRef(null);

  const STEPS = [
    {
      key: "hpi",
      href: "/fields/hpi",
      label: "HPI Sorghum Diversity Trial",
      overline: "HPI — Genetic Diversity",
      summary:
        "Five-year sorghum diversity trial: 344 varieties across 13.5 acres (St. Charles, MO). Expertly managed, instrumented, and deeply sampled.",
      bullets: [
        "Agronomic traits: height, lodging, flowering time, biomass",
        "Digital data: UAV, Licor, environmental sensors",
        "Deep soil sampling for root biomass & soil conditions",
        "Goal: gene–trait patterns; deeper, robust roots & carbon sequestration",
      ],
      tags: ["5 years", "344 varieties", "13.5 acres", "UAV & sensors"],
    },
    {
      key: "climate",
      href: "/fields/climate-smart",
      label: "Climate Smart Field",
      overline: "Sorghum × Maize × Practices",
      summary:
        "Five-year ‘climate-smart’ comparison: two sorghum hybrids vs maize under conventional and sustainable practice combinations.",
      bullets: [
        "Treatments: no-till, precision N, legume cover crop",
        "Controls: till, standard N, no cover",
        "Data: minirhizotron, UAV, soil T/θ, environment, yields, grain composition",
        "Goal: practice × crop impacts on yield & quality",
      ],
      tags: ["5 years", "13.5 acres", "Root imaging", "UAV & sensors"],
    },
  ];

  // Trigger the section's first reveal when it enters the viewport.
  React.useEffect(() => {
    if (reduce) {
      setRevealed(true);
      return;
    }
    const node = containerRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect(); // run once
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduce]);

  // Stagger: header first, then cards 1 & 2.
  const headerBaseDelay = 0.0; // s
  const cardStagger = 0.18; // s between cards

  return (
    <Box
      id="fields"
      sx={{
        position: "relative",
        bgcolor: "black",
        color: "common.white",
        overflow: "hidden",

        // subtle moving grid
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -200,
          pointerEvents: "none",
          opacity: 0.16,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          animation: reduce ? "none" : "pan 26s linear infinite",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
        },
        "@keyframes pan": { to: { backgroundPosition: "0 100%" } },

        // reveal ups
        "@keyframes revealY": {
          from: { transform: "translateY(24px)", opacity: 0 },
          to: { transform: "translateY(0px)", opacity: 1 },
        },
        // dimmer final opacity (for overlines)
        "@keyframes revealYDim": {
          from: { transform: "translateY(16px)", opacity: 0 },
          to: { transform: "translateY(0px)", opacity: 0.75 },
        },
      }}
    >
      <Container ref={containerRef} sx={{ py: { xs: 8, md: 14 } }}>
        <Grid container columnSpacing={{ md: 6 }}>
          {/* Steps (left) */}
          <Grid item xs={12} md={5}>
            <Stack spacing={{ xs: 6, md: 10 }}>
              <SectionHeader
                overline="Our living testbeds"
                title="Two active field trials built for real-world research"
                reveal={revealed && !reduce}
                baseDelay={headerBaseDelay}
                reduceMotion={reduce}
              />

              {STEPS.map((s, i) => (
                <StepCard
                  key={s.key}
                  href={s.href}
                  overline={s.overline}
                  title={s.label}
                  summary={s.summary}
                  bullets={s.bullets}
                  tags={s.tags}
                  reveal={revealed && !reduce}
                  delay={cardStagger * (i + 1)} // 0.18s, 0.36s
                  reduceMotion={reduce}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function SectionHeader({
  overline,
  title,
  reveal = false,
  baseDelay = 0,
  reduceMotion = false,
}) {
  // Overline and title each animate with their own offsets:
  const overlineDelay = baseDelay + 0.0;
  const titleDelay = baseDelay + 0.12;

  return (
    <Stack spacing={1} sx={{ maxWidth: 680 }}>
      <Typography
        variant="overline"
        sx={{
          letterSpacing: 2,
          ...(reduceMotion
            ? { opacity: 0.75 }
            : {
                opacity: 0,
                transform: "translateY(16px)",
                animation: reveal
                  ? `revealYDim .6s ease ${overlineDelay}s both`
                  : "none",
                willChange: "transform, opacity",
              }),
        }}
      >
        {overline}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: 28, sm: 34 },
          lineHeight: 1.2,
          fontWeight: 600,
          ...(reduceMotion
            ? {}
            : {
                opacity: 0,
                transform: "translateY(24px)",
                animation: reveal
                  ? `revealY .7s ease ${titleDelay}s both`
                  : "none",
                willChange: "transform, opacity",
              }),
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
}

function StepCard({
  overline,
  href,
  title,
  summary,
  bullets,
  tags,
  reveal = false,
  delay = 0,
  reduceMotion = false,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!href) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <Box
      tabIndex={0} // allow keyboard focus
      sx={{
        position: "relative", // anchor the button
        p: { xs: 2.5, sm: 3 }, // => 20px / 24px side padding
        pb: { xs: 9, sm: 10, md: 9 }, // room for the full-width button on xs/sm
        borderRadius: 3,
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.18)",
        bgcolor: "rgba(255,255,255,0.03)",
        boxShadow: "none",
        transition:
          "border-color .25s ease, box-shadow .25s ease, background-color .25s ease, transform .2s ease",

        // Hover / focus-visible highlight (replaces scroll-into-view highlighting)
        "&:hover": {
          borderColor: "secondary.light",
          bgcolor: "rgba(96,173,94,0.08)",
          boxShadow: "0 0 0 4px rgba(96,173,94,0.10)",
          transform: "translateY(-2px)",
        },
        "&:focus-visible": {
          outline: "none",
          borderColor: "secondary.light",
          bgcolor: "rgba(96,173,94,0.08)",
          boxShadow: "0 0 0 4px rgba(96,173,94,0.18)",
          transform: "translateY(-2px)",
        },

        ...(reduceMotion
          ? {}
          : {
              // Hidden initial state → reveal
              opacity: 0,
              transform: "translateY(24px)",
              animation: reveal ? `revealY .7s ease ${delay}s both` : "none",
              willChange: "transform, opacity",
            }),
      }}
    >
      <Typography variant="overline" sx={{ opacity: 0.75 }}>
        {overline}
      </Typography>
      <Typography variant="h6" sx={{ mt: 0.5, mb: 1.5 }}>
        {title}
      </Typography>
      <Typography sx={{ opacity: 0.9, mb: 2 }}>{summary}</Typography>
      <Stack component="ul" sx={{ m: 0, pl: 3, gap: 0.75 }}>
        {bullets.map((b, i) => (
          <Typography key={i} component="li" sx={{ opacity: 0.9 }}>
            {b}
          </Typography>
        ))}
      </Stack>
      <Stack direction="row" flexWrap="wrap" gap={1.0} mt={2}>
        {tags.map((t, i) => (
          <Chip
            key={i}
            label={t}
            variant="outlined"
            sx={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.9)",
              bgcolor: "rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </Stack>

      {/* Learn More button:
          - xs/sm: spans the full bottom of the card *inside* the padding (left/right match p)
          - md+: compact button anchored bottom-right */}
      <Button
        href={href}
        onClick={handleClick}
        aria-label={`Learn more about ${title}`}
        sx={(theme) => ({
          position: "absolute",

          // Match the card's inner padding so the bar aligns with text width on xs/sm.
          // p.xs = 2.5 (=> 20px), p.sm = 3 (=> 24px).
          left: {
            xs: theme.spacing(2.5),
            sm: theme.spacing(3),
            md: "auto",
          },
          right: {
            xs: theme.spacing(2.5),
            sm: theme.spacing(3),
            md: 16,
          },
          bottom: 16,

          // On md+ we want a compact button; on xs/sm it naturally expands because left+right are set.
          // Padding / typography
          px: { xs: 1.5, sm: 2, md: 2.5 }, // 12px, 16px, 20px
          py: { xs: 1, sm: 1, md: 1 }, // 8px
          fontSize: { xs: 14, sm: 15, md: 16 },
          letterSpacing: { xs: "0.2px", sm: "0.3px", md: "0.3px" },

          color: "common.white",
          background:
            "linear-gradient(90deg, rgba(96,173,94,0.35) 0%, rgba(96,173,94,0.55) 100%)",
          border: "1px solid rgba(96,173,94,0.65)",
          boxShadow: "0 0 0 0 rgba(96,173,94,0)",
          textTransform: "none",
          transition: theme.transitions.create(
            ["transform", "box-shadow", "background-color", "border-color"],
            { duration: 250 }
          ),

          // touch target on small screens
          minHeight: 44,
          textAlign: "center",

          "&:hover": {
            background:
              "linear-gradient(90deg, rgba(96,173,94,0.55) 0%, rgba(96,173,94,0.75) 100%)",
            borderColor: theme.palette.secondary.light,
            transform: "translateY(-1px)",
            boxShadow:
              "0 0 0 0px rgba(96,173,94,0.28), 0 12px 28px rgba(96,173,94,0.20)",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow:
              "0 0 0 10px rgba(96,173,94,0.28), 0 12px 28px rgba(96,173,94,0.35)",
            borderColor: theme.palette.secondary.light,
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow:
              "0 0 0 6px rgba(96,173,94,0.18), 0 8px 18px rgba(96,173,94,0.28)",
          },
        })}
      >
        Learn More
      </Button>
    </Box>
  );
}
