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

// 🔸 Adjust this path to your asset if needed
import ClimateSmartHero from "../../../assets/gallery/CS/CS1.webp";

export default function ClimateSmartPanel() {
  const theme = useTheme();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const tags = [
    "No-till",
    "Precision N",
    "Legume cover crop",
    "UAV imagery",
    "Minirhizotron roots",
    "Soil T/θ",
    "Env. sensors",
    "Harvest yields",
    "Soil analysis",
    "Grain composition",
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
      id="climate-smart"
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
      {/* Top-left Back button, does not render under the md breakpoint*/}
      {isMdUp && (
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
      )}

      <Container>
        {/* ===== Header + Side Image (equal height; image only on md+) ===== */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr minmax(320px, 40%)" },
              gap: { xs: 0, md: 3 },
              alignItems: "stretch",
            }}
          >
            {/* LEFT: Header content (unchanged descriptions) */}
            <Stack spacing={{ xs: 1, md: 1.5 }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: 2, opacity: 0.75 }}
              >
                Location · St. Charles, Missouri
              </Typography>
              <Header title="Climate Smart Field" />
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
                Funded by the National Sorghum Producers Climate Smart grant,
                this five-year field trial compares{" "}
                <b>two commercial sorghum hybrids</b> with <b>maize</b> under
                different management practices. A conventional control uses{" "}
                <b>tilling</b>, <b>standard nitrogen</b>, and{" "}
                <b>no cover crop</b>. Most fields are combinations of
                conventional practices with more sustainable options:{" "}
                <b>no-till</b> (planting into last season’s residue without
                plowing or disking to keep soil undisturbed),{" "}
                <b>precision nitrogen</b> (applying nitrogen fertilizer at the
                right rate, place, and time for each field/zone based on tests
                or sensor/yield data), or a <b>legume cover crop</b> (sowing
                non-harvested legumes, like clover or vetch, between cash crops
                to biologically fix nitrogen, protect and build soil, and
                suppress weeds). One field applies only the sustainable
                practices.
              </Typography>
            </Stack>

            {/* RIGHT: Responsive image (renders only on md+) */}
            {isMdUp && (
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.18)",
                  minHeight: 120,
                }}
              >
                <Box
                  component="img"
                  src={ClimateSmartHero}
                  alt="Climate Smart field overview"
                  loading="lazy"
                  decoding="async"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
        {/* ===== End Header + Side Image ===== */}

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
              <Stat label="Crops" value="Sorghum hybrids & Maize" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="cell">
              <Stat label="Funding" value="National Sorghum Producers" />
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
                    term: "Comparison",
                    desc: "Two commercial sorghum hybrids vs maize under multiple practice combinations.",
                  },
                  {
                    term: "Control (Conventional)",
                    desc: "Tilling, standard nitrogen, no cover crop.",
                  },
                  {
                    term: "Sustainable Practices",
                    desc: "No-till • Precision nitrogen • Legume cover crop. Most fields combine conventional + sustainable; one field uses only the sustainable set.",
                  },
                  {
                    term: "Timeline & Site",
                    desc: "Five years on the same 13.5 acres in St. Charles, MO.",
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
                    desc: "PheNode (Agrela Ecosystems); Wireless sensors (Agrela Ecosystems); FieldDock (Shakoor Lab); Minirhizotron root imaging.",
                  },
                  {
                    term: "Data Collected",
                    desc: "Below-ground root images (minirhizotron), UAV imagery, soil temperature & moisture (soil sensors), environmental sensors, harvest yields, soil analysis, grain composition.",
                  },
                  {
                    term: "Objective",
                    desc: "Determine how practice combinations influence yield and grain quality over time.",
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
