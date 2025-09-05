import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Modal,
  ButtonBase,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import HPI1 from "../../../assets/gallery/HPI/HPI1.webp";
import HPI2 from "../../../assets/gallery/HPI/HPI2.webp";
import HPI3 from "../../../assets/gallery/HPI/HPI3.webp";
import HPI4 from "../../../assets/gallery/HPI/HPI4.webp";
import HPI5 from "../../../assets/gallery/HPI/HPI5.webp";
import HPI6 from "../../../assets/gallery/HPI/HPI6.webp";
import HPI7 from "../../../assets/gallery/HPI/HPI7.webp";
import HPI8 from "../../../assets/gallery/HPI/HPI8.webp";
import HPI9 from "../../../assets/gallery/HPI/HPI9.webp";
import HPI10 from "../../../assets/gallery/HPI/HPI10.webp";
import HPI11 from "../../../assets/gallery/HPI/HPI11.webp";
import HPI12 from "../../../assets/gallery/HPI/HPI12.webp";

/**
 * Responsive masonry + lightbox gallery for mixed photos/videos.
 * - Back button shows at top-left on md+.
 * - On xs/sm, a full-width sticky bottom Back button appears.
 */

export default function FieldMediaGallery() {
  const theme = useTheme();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const MEDIA = [
    {
      type: "image",
      src: HPI1,
      alt: "UAV canopy mosaic over Climate Smart plots",
      caption: "UAV Imagery · Sorghum Canopy ",
    },
    {
      type: "image",
      src: HPI2,
      alt: "UAV canopy mosaic over Climate Smart plots",
      caption: "UAV Imagery · Sorghum Canopy ",
    },
    {
      type: "image",
      src: HPI3,
      alt: "Minirhizotron root image",
      caption: "Minirhizotron · Root Architecture",
    },
    {
      type: "image",
      src: HPI4,
      alt: "Wireless soil sensor probe installed in field",
      caption: "Wireless Soil Sensor · Installation",
    },
    {
      type: "image",
      src: HPI5,
      alt: "PheNode weather & phenotyping node",
      caption: "PheNode · Weather & Phenotyping Node",
    },
    {
      type: "image",
      src: HPI6,
      alt: "FieldDock and UAV Drone",
      caption: "FieldDock · Edge Gateway",
    },
    {
      type: "image",
      src: HPI7,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
    },
    {
      type: "image",
      src: HPI8,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
    },
    {
      type: "image",
      src: HPI9,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
    },
    {
      type: "image",
      src: HPI10,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
    },
    {
      type: "image",
      src: HPI11,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
    },
    {
      type: "image",
      src: HPI12,
      alt: "FieldDock and UAV Drone",
      caption: "UAV imagery · Sorghum Canopy",
    },
  ];

  const [openIdx, setOpenIdx] = React.useState(-1);
  const open = (i) => setOpenIdx(i);
  const close = () => setOpenIdx(-1);
  const next = () => setOpenIdx((i) => (i + 1) % MEDIA.length);
  const prev = () => setOpenIdx((i) => (i - 1 + MEDIA.length) % MEDIA.length);

  // Back button behavior
  const handleBack = React.useCallback((e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      if (window.history.length > 1) window.history.back();
      else window.location.assign("/");
    }
  }, []);

  // Keyboard controls when lightbox is open
  React.useEffect(() => {
    if (openIdx < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  // Base styling for the green "Back" button
  const backButtonBaseSx = (theme) => ({
    zIndex: 2,
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
  });

  return (
    <Box
      id="gallery"
      sx={{
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
        py: { xs: 8, md: 12 },
        // Add safe space at bottom on xs/sm so the sticky bar won't cover content
        pb: { xs: 14, sm: 14, md: 12 },
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -200,
          pointerEvents: "none",
          opacity: 0.12,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          animation: reduce ? "none" : "pan 24s linear infinite",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
        },
        "@keyframes pan": { to: { backgroundPosition: "0 100%" } },
      }}
    >
      <Container>
        {/* Header */}
        <Stack
          spacing={{ xs: 1, md: 1.5 }}
          sx={{ mb: { xs: 4, md: 6 }, textAlign: "center" }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, opacity: 0.75 }}
          >
            Field Evidence
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 28, sm: 34 },
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            Photos & video from the Climate Smart testbed
          </Typography>
          <Typography
            sx={{
              opacity: 0.9,
              maxWidth: 900,
              mx: "auto",
              alignSelf: "center",
            }}
          >
            UAV imagery, minirhizotron roots, soil probes, and edge
            devices—captured on site to illustrate instrumentation and outcomes.
          </Typography>
        </Stack>

        {/* Masonry (CSS columns) */}
        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 2,
            p: { xs: 1.25, sm: 1.5, md: 2 },
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          <Box
            sx={{
              columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
              columnGap: { xs: "12px", sm: "16px", md: "18px" },
            }}
          >
            {MEDIA.map((m, i) => (
              <Tile key={i} media={m} reduce={reduce} onClick={() => open(i)} />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Sticky bottom Back button on xs/sm (hidden while lightbox is open) */}
      {!isMdUp && openIdx < 0 && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            p: { xs: 1.25, sm: 1.5 },
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.55)",
            borderTop: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <Button
            component="a"
            href="#"
            onClick={handleBack}
            aria-label="Go back to previous page"
            fullWidth
            sx={(theme) => ({
              ...backButtonBaseSx(theme),
              borderRadius: 1.5,
              minHeight: 52,
              "&:hover": {
                ...backButtonBaseSx(theme)["&:hover"],
                transform: "none",
              },
            })}
          >
            Back
          </Button>
        </Box>
      )}

      {/* Lightbox */}
      <Modal open={openIdx >= 0} onClose={close}>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(0,0,0,0.85)",
            p: 2,
          }}
        >
          {openIdx >= 0 && (
            <LightboxContent
              item={MEDIA[openIdx]}
              onPrev={prev}
              onNext={next}
              onClose={close}
              reduce={reduce}
              isSmUp={isSmUp}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

/* ---------- Tile (grid item) ---------- */

function Tile({ media, reduce, onClick }) {
  return (
    <Box
      sx={{
        breakInside: "avoid-column",
        WebkitColumnBreakInside: "avoid",
        MozColumnBreakInside: "avoid",
        display: "block",
        width: "100%",
        mb: { xs: 1.25, sm: 1.5, md: 2 },
        cursor: "pointer",
      }}
    >
      <ButtonBase
        onClick={onClick}
        focusRipple
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          display: "block",
          textAlign: "left",
          outlineOffset: 4,
          border: "1px solid rgba(255,255,255,0.18)",
          position: "relative",
          transition: "transform .35s ease, box-shadow .35s ease",
          boxShadow: "0 8px 26px rgba(0,0,0,0.35)",
          willChange: reduce ? "auto" : "transform, box-shadow",

          // Green "border" via overlay ring (stable across breakpoints)
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            boxShadow: "inset 0 0 0 2px transparent",
            transition: "box-shadow .25s ease",
          },
          "&:hover::after": reduce
            ? {}
            : { boxShadow: "inset 0 0 0 2px #60ad5e" },

          "&:hover": reduce
            ? {}
            : {
                transform: "translateY(-2px)",
                boxShadow: "0 16px 44px rgba(0,0,0,0.45)",
              },
        }}
      >
        {/* Media */}
        {media.type === "image" ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              backgroundColor: "rgba(255,255,255,0.04)",
              // keep compositing so thumbs don’t vanish in columns
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            <Box
              component="img"
              src={media.src}
              alt={media.alt || ""}
              loading="eager"
              decoding="async"
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backfaceVisibility: "hidden",
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              backgroundColor: "rgba(255,255,255,0.04)",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
            aria-label={media.alt || "Video"}
          >
            <Box
              component="img"
              src={media.poster}
              alt=""
              aria-hidden
              loading="eager"
              decoding="async"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                backfaceVisibility: "hidden",
              }}
            />
            {/* Play badge */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 62,
                height: 62,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(3px)",
                display: "grid",
                placeItems: "center",
                "&::after": {
                  content: '""',
                  display: "block",
                  width: 0,
                  height: 0,
                  borderLeft: "16px solid white",
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  ml: "4px",
                },
              }}
            />
          </Box>
        )}

        {/* Overlay gradient + caption */}
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            p: 1.25,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.0) 55%)",
            opacity: 0.0,
            transition: "opacity .25s ease",
            ".MuiButtonBase-root:hover &": { opacity: 1 },
          }}
        >
          {media.caption && (
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.95)",
                fontWeight: 600,
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              {media.caption}
            </Typography>
          )}
        </Box>
      </ButtonBase>
    </Box>
  );
}

/* ---------- Lightbox ---------- */

function LightboxContent({ item, onPrev, onNext, onClose, reduce, isSmUp }) {
  // Clicking the media area navigates: left half = Prev, right half = Next
  const handleMediaClick = React.useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 2) onPrev();
      else onNext();
    },
    [onPrev, onNext]
  );

  // Stop propagation from buttons so media click layer never fires
  const stopAnd = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "min(1080px, 92vw)",
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.18)",
        overflow: "hidden",
        boxShadow: "0 30px 120px rgba(0,0,0,0.6)",
        backgroundColor: "rgba(20,20,20,0.9)",
        p: { xs: 1.25, sm: 1.5 },
      }}
      // Allow clicking anywhere outside the caption row to navigate
      onClick={isSmUp ? handleMediaClick : undefined}
      role={isSmUp ? "button" : undefined}
      aria-label={
        isSmUp ? "Click left for previous, right for next" : undefined
      }
    >
      {/* Media */}
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          bgcolor: "black",
          borderRadius: 1.5,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {item.type === "image" ? (
          <Box
            component="img"
            src={item.src}
            alt={item.alt || ""}
            sx={{
              maxWidth: "100%",
              maxHeight: "78vh",
              objectFit: "contain",
              display: "block",
              // ❌ no fade-in animation to avoid flicker
            }}
          />
        ) : (
          <Box
            component="video"
            src={item.src}
            poster={item.poster}
            controls
            playsInline
            style={{ maxWidth: "100%", maxHeight: "78vh" }}
          />
        )}
      </Box>

      {/* Caption row (buttons never bubble to media layer) */}
      {(item.caption || item.alt) && (
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            position: "relative",
            zIndex: 2,
            pointerEvents: "auto",
          }}
          // Stop click so clicking the caption area doesn't navigate
          onClick={(e) => e.stopPropagation()}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.92, pr: 1, flex: "1 1 auto" }}
          >
            {item.caption || item.alt}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
            <NavButton label="Prev" onClick={stopAnd(onPrev)} />
            <NavButton label="Next" onClick={stopAnd(onNext)} />
            <CloseButton onClick={stopAnd(onClose)} />
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function NavButton({ label, onClick }) {
  const arrow = label === "Prev" ? "‹" : "›";
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        minWidth: 40,
        height: 36,
        px: 1.25,
        borderRadius: 1,
        border: "1px solid rgba(255,255,255,0.3)",
        color: "white",
        bgcolor: "rgba(255,255,255,0.06)",
        "&:hover": {
          borderColor: "#60ad5e",
          bgcolor: "rgba(96,173,94,0.12)",
        },
      }}
    >
      <Typography component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
        {arrow}
      </Typography>
      <Typography component="span" sx={{ ml: 0.5, fontSize: 13 }}>
        {label}
      </Typography>
    </ButtonBase>
  );
}

function CloseButton({ onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-label="Close"
      sx={{
        minWidth: 40,
        height: 36,
        px: 1.25,
        borderRadius: 1,
        border: "1px solid rgba(255,255,255,0.3)",
        color: "white",
        bgcolor: "rgba(255,255,255,0.06)",
        "&:hover": {
          borderColor: "#60ad5e",
          bgcolor: "rgba(96,173,94,0.12)",
        },
      }}
    >
      <Typography component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
        ×
      </Typography>
      <Typography component="span" sx={{ ml: 0.5, fontSize: 13 }}>
        Close
      </Typography>
    </ButtonBase>
  );
}
