import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

export function FooterCTA() {
  const theme = useTheme();
  const accent = theme.palette?.secondary?.light || "#60ad5e";

  return (
    <Box
      id="contact"
      sx={{
        position: "relative",
        bgcolor: "black",
        color: "common.white",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        // 40% top border that begins at the middle and runs to the right
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "25%",
          width: "50%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 0 4px ${alpha(accent, 0.12)}, 0 0 12px ${alpha(
            accent,
            0.55
          )}`,
          animation: "pulse 3.2s ease-in-out infinite",
          pointerEvents: "none",
        },
        // Radiating wash below the line (same vibe as your TechShowcase glow)
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            See the testbed in action
          </Typography>
          <Typography sx={{ opacity: 0.9, maxWidth: 640 }}>
            We’re ready for open, integrated NextG experiments—on real acreage,
            with real data.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              href="mailto:shakoorlab.danforth@gmail.com"
              target="_blank" // try to open in a separate tab/window
              rel="noopener noreferrer" // security best practice when using _blank
            >
              Request a field tour
            </Button>
            {/* <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
            >
              Download site brief
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
