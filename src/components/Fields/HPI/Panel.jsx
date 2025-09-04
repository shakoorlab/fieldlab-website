import * as React from "react";
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

export default function HPIPanel() {
  const theme = useTheme();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  const tags = [
    "344 varieties",
    "Plant height",
    "Lodging",
    "Flowering time",
    "Biomass",
    "UAV imagery",
    "LI-COR data",
    "Environmental sensors",
    "Deep soil sampling",
    "Carbon sequestration",
  ];

  const handleBack = React.useCallback((e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.assign("/");
      }
    }
  }, []);

  return (
    <Box
      id="hpi"
      sx={{
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -200,
          pointerEvents: "none",
          opacity: 0.14,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          animation: reduce ? "none" : "pan 26s linear infinite",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
        },
        "@keyframes pan": { to: { backgroundPosition: "0 100%" } },
      }}
    >
      {/* Top-left Back button */}
      <Button
        component="a"
        href="#"
        onClick={handleBack}
        aria-label="Go back to previous page"
        sx={(theme) => ({
          position: "absolute",
          zIndex: 2,

          top: {
            xs: theme.spacing(2.5),
            sm: theme.spacing(3),
            md: theme.spacing(3),
          },
          left: {
            xs: theme.spacing(2.5),
            sm: theme.spacing(3),
            md: theme.spacing(3),
          },

          px: { xs: 1.5, sm: 2, md: 2.5 },
          py: { xs: 1, sm: 1, md: 1 },
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
        Back
      </Button>

      <Container>
        {/* Header */}
        <Stack spacing={{ xs: 1, md: 1.5 }} sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, opacity: 0.75 }}
          >
            Location · St. Charles, Missouri
          </Typography>
          <Header title="Genetic Diversity Field Trial" />
          <Typography
            sx={{
              opacity: 0.92,
              maxWidth: 900,
              animation: reduce ? "none" : "fadeUp .65s ease both",
              "@keyframes fadeUp": {
                from: { opacity: 0, transform: "translateY(6px)" },
              },
            }}
          >
            Our genetic diversity field trial spans <b>5 years</b> and includes{" "}
            <b>344 varieties of sorghum</b>. This <b>13.5‑acre</b> experiment in{" "}
            <b>St. Charles, MO</b> is managed by <b>expert farmers</b>.
            Researchers take agronomic measurements such as <b>plant height</b>,{" "}
            <b>lodging</b>, <b>flowering time</b>, and <b>biomass</b>. Digital
            data is collected via <b>UAVs</b>, <b>LI‑COR instruments</b>, and{" "}
            <b>environmental sensors</b>. The goal is to review year‑by‑year
            data to find <b>trait patterns associated with specific genes</b>.
            We’re interested in varieties with{" "}
            <b>deeper, more robust root systems</b> that enhance{" "}
            <b>carbon sequestration</b>. <b>Deep soil sampling</b> at the end of
            the growing season provides data about <b>soil conditions</b> and{" "}
            <b>root biomass</b>. Our research scientists will analyze this
            extensive field dataset to gain new{" "}
            <b>insights into sorghum genetics</b> and inform future{" "}
            <b>sorghum breeding programs</b>.
          </Typography>
        </Stack>

        {/* Top stats bar (responsive) */}
        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 2,
            overflow: "hidden",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Grid
            container
            sx={{
              "& > .cell": {
                px: { xs: 2, md: 3 },
                py: { xs: 2, md: 2.5 },
                borderRight: {
                  xs: "none",
                  md: "1px solid rgba(255,255,255,0.12)",
                },
              },
              "& > .cell:last-of-type": { borderRight: "none" },
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          >
            <Grid item xs={12} sm={6} md={3} className="cell">
              <Stat label="Duration" value="5 years" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="cell">
              <Stat label="Area" value="13.5 acres" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="cell">
              <Stat label="Varieties" value="344 sorghum varieties" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="cell">
              <Stat label="Management" value="Expert farmers" />
            </Grid>
          </Grid>
        </Box>

        {/* Two-column details */}
        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* LEFT COLUMN */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                p: { xs: 2, md: 3 },
                borderBottom: {
                  xs: "1px solid rgba(255,255,255,0.12)",
                  md: "none",
                },
                borderRight: { md: "1px solid rgba(255,255,255,0.12)" },
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <DL
                items={[
                  {
                    term: "Trial Scope",
                    desc: "Genetic diversity study across 344 sorghum varieties.",
                  },
                  {
                    term: "Duration & Site",
                    desc: "Five years on the same 13.5 acres in St. Charles, MO.",
                  },
                  {
                    term: "Management",
                    desc: "Experiment managed by expert farmers.",
                  },
                  {
                    term: "Agronomic Measurements",
                    desc: "Plant height, lodging, flowering time, biomass.",
                  },
                ]}
              />
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid item xs={12} md={6} sx={{ p: { xs: 2, md: 3 } }}>
              <DL
                items={[
                  {
                    term: "Technology In Use",
                    desc: "UAVs; LI-COR instruments; environmental sensors; end-of-season deep soil sampling.",
                  },
                  {
                    term: "Data Collected",
                    desc: "Agronomic traits, digital datasets from UAVs and LI-COR, environmental sensor streams, and deep soil sampling for soil conditions and root biomass.",
                  },
                  {
                    term: "Objective",
                    desc: "Review yearly data to identify trait patterns linked to specific genes; prioritize deeper, more robust root systems that enhance carbon sequestration; generate insights to guide future sorghum breeding.",
                  },
                ]}
              />

              {/* Tag cloud */}
              <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                {tags.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.30)",
                      color: "rgba(255,255,255,0.92)",
                      bgcolor: "rgba(255,255,255,0.04)",
                    }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

/* ——— Reusable bits ——— */

function Header({ title }) {
  return (
    <Typography
      variant="h4"
      sx={{
        fontSize: { xs: 28, sm: 34 },
        lineHeight: 1.2,
        fontWeight: 600,
      }}
    >
      {title}
    </Typography>
  );
}

function Stat({ label, value }) {
  return (
    <Stack spacing={0.25}>
      <Typography
        variant="overline"
        sx={{ letterSpacing: 1, opacity: 0.75, lineHeight: 1 }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: { xs: 18, md: 20 } }}>
        {value}
      </Typography>
    </Stack>
  );
}

function DL({ items }) {
  return (
    <Box component="dl" sx={{ m: 0 }}>
      {items.map((it, i) => (
        <Box
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "220px 1fr" },
            gap: 1.25,
            py: 1.25,
            borderBottom:
              i === items.length - 1
                ? "none"
                : "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Typography
            component="dt"
            sx={{ fontWeight: 600, opacity: 0.9, minWidth: 180 }}
          >
            {it.term}
          </Typography>
          <Typography component="dd" sx={{ m: 0, opacity: 0.92 }}>
            {it.desc}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
