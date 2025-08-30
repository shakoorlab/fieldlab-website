import * as React from "react";

import {
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  Box,
} from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import hero from "../../assets/hero.webp";

import Navbar from "../Navbar/Navbar";

//util
import { smoothScrollToEl } from "../../utils/smoothScroll";
import BlackIntroSection from "../blackIntroSection";
// import SensorGridConnect from "../SensorGridConnect";

function Hero() {
  // Smooth scroll to next section
  const handleScrollDown = React.useCallback(() => {
    const el = document.getElementById("next-section");
    // Increase duration for slower scroll; set offset if a fixed navbar covers content.
    smoothScrollToEl(el, { duration: 2200, offset: 0 /* e.g. -72 */ });
  }, []);
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          //   pt: { xs: 40, sm: 44 },
          backgroundRepeat: "no-repeat",
          // slight global shadowing over the image (subtle dark + vignette)
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,1))",
            boxShadow: "inset 0 0 80px rgba(0,0,0,0.35)",
            pointerEvents: "none",
          },
        }}
      >
        <Navbar />
        <Container
          sx={{
            py: { xs: 4, sm: 6 },
            pt: { xs: 40, sm: 44 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Stack spacing={{ xs: 3, sm: 4 }}>
            <Box>
              {/* <Typography variant="overline" color="text.secondary">
                Welcome to
              </Typography> */}

              <Typography
                variant="h3"
                component="h1"
                color="common.white"
                fontWeight={300}
                sx={{
                  mt: 1,
                  overflow: "hidden",
                  display: "block",
                  animation: "revealText 1.2s ease forwards",
                  "@keyframes revealText": {
                    from: { transform: "translateY(100%)", opacity: 0 },
                    to: { transform: "translateY(0%)", opacity: 1 },
                  },
                }}
              >
                Where Innovation Takes Root
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: 1.5 }}
                color="common.white"
                fontWeight={400}
                sx={{
                  mt: 1,
                  overflow: "hidden",
                  display: "block",
                  animation: "revealText 3s ease forwards",
                  "@keyframes revealText": {
                    from: { transform: "translateY(100%)", opacity: 0 },
                    to: { transform: "translateY(0%)", opacity: 1 },
                  },
                }}
              >
                Transforming open fields into real-world testbeds for 5G
                connectivity.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  animation: "revealText 3s ease forwards",
                  "@keyframes revealText": {
                    from: { transform: "translateY(100%)", opacity: 0 },
                    to: { transform: "translateY(0%)", opacity: 1 },
                  },
                }}
              >
                Partner With Us
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  animation: "revealText 3s ease forwards",
                  "@keyframes revealText": {
                    from: { transform: "translateY(100%)", opacity: 0 },
                    to: { transform: "translateY(0%)", opacity: 1 },
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>

            {/* <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" gutterBottom>
                A rounded surface
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This Paper’s radius comes from <code>--radius</code>, which
                scales up at your breakpoints. Button padding is controlled by{" "}
                <code>--btn-py/--btn-px</code>, also responsive.
              </Typography>
            </Paper> */}
          </Stack>
        </Container>
        {/* --- Scroll Down cue (bottom-center) --- */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: { xs: 12, sm: 20 },
            display: "flex",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Button
            onClick={handleScrollDown}
            aria-label="Scroll down"
            variant="text"
            disableRipple
            sx={{
              animation: "revealText 10s ease forwards",
              "@keyframes revealText": {
                from: { transform: "translateY(100%)", opacity: 0 },
                to: { transform: "translateY(0%)", opacity: 1 },
              },

              gap: 1,
              alignItems: "center",
              color: "common.white",
              textTransform: "none",
              px: 1,
              minWidth: 0,
              opacity: 0.9,
              "&:hover": { bgcolor: "transparent", opacity: 1 },
              // Make the whole control scale nicely
              fontSize: "clamp(11px, 1.2vw, 14px)",
              // Subtle float on the arrow
              ".arrow": {
                animation: "bounceY 1.8s ease-in-out infinite",
              },
              "@keyframes bounceY": {
                "0%,100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(4px)" },
              },
            }}
          >
            <KeyboardArrowDownRoundedIcon
              className="arrow"
              sx={{ fontSize: "1.4em" }}
            />
            <Typography component="span" sx={{ lineHeight: 1 }}>
              Scroll down
            </Typography>
          </Button>
        </Box>
      </Box>
      <BlackIntroSection id="next-section" />
      {/* <SensorGridConnect id="next-section" /> */}
    </>
  );
}

export default Hero;
