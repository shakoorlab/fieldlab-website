import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Modal,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * MasonryLightboxGallery
 * - Uniform tiles via ratio-box (no CSS `aspect-ratio`)
 * - CSS columns layout
 * - Simple opacity-only hover (no transforms/box-shadows/ripple in tiles)
 * - Lightbox with Esc/←/→ support
 * - Sticky bottom "Back" button on xs/sm with original styling & logic
 *
 * Props:
 * - media: Array<{ src: string, alt?: string, caption?: string }>
 * - title?: string
 * - subtitle?: string
 * - ratio?: number (width/height). Default 16/10.
 * - enableMobileBack?: boolean (default true)
 * - onBack?: () => void (default: history back or redirect '/')
 */
export default function MasonryLightboxGallery({
  media = [],
  title = "Gallery",
  subtitle = "",
  ratio = 16 / 10,
  enableMobileBack = true,
  onBack,
}) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [openIdx, setOpenIdx] = React.useState(-1);
  const open = (i) => setOpenIdx(i);
  const close = () => setOpenIdx(-1);
  const next = () => setOpenIdx((i) => (i + 1) % media.length);
  const prev = () => setOpenIdx((i) => (i - 1 + media.length) % media.length);

  // Back button behavior (original logic)
  const handleBack = React.useCallback((e) => {
    e?.preventDefault?.();
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

  // Original "Back" button base styling
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
      borderColor: theme.palette.secondary?.light || "#9be7a1",
      transform: "translateY(-1px)",
      boxShadow:
        "0 0 0 0px rgba(96,173,94,0.28), 0 12px 28px rgba(96,173,94,0.20)",
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow:
        "0 0 0 10px rgba(96,173,94,0.28), 0 12px 28px rgba(96,173,94,0.35)",
      borderColor: theme.palette.secondary?.light || "#9be7a1",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow:
        "0 0 0 6px rgba(96,173,94,0.18), 0 8px 18px rgba(96,173,94,0.28)",
    },
  });

  const ratioPt = `${(100 / ratio).toFixed(4)}%`;

  return (
    <Box
      id="gallery"
      sx={{
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
        py: { xs: 8, md: 12 },
        // Space at bottom so the sticky bar won't cover content
        pb: { xs: 14, sm: 14, md: 12 },
      }}
    >
      <Container>
        {/* Header */}
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: "center" }}>
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
            {title}
          </Typography>
        </Box>
        {subtitle && (
          <Typography
            sx={{
              opacity: 0.9,
              maxWidth: 900,
              mx: "auto",
              textAlign: "center",
              mb: 3,
            }}
          >
            {subtitle}
          </Typography>
        )}

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
              columnWidth: { xs: "300px", sm: "320px", md: "340px" },
            }}
          >
            {media.map((m, i) => (
              <Tile
                key={i}
                media={m}
                onOpen={() => open(i)}
                ratioPt={ratioPt}
              />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Sticky bottom Back button on xs/sm (hidden while lightbox is open) */}
      {enableMobileBack && !isMdUp && openIdx < 0 && (
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
            onClick={onBack || handleBack}
            aria-label="Go back to previous page"
            fullWidth
            sx={(t) => ({
              ...backButtonBaseSx(t),
              borderRadius: 1.5,
              minHeight: 52,
              // Tame wobble on mobile hover
              "&:hover": {
                ...backButtonBaseSx(t)["&:hover"],
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
            bgcolor: "rgba(0,0,0,0.88)",
            p: 2,
          }}
        >
          {openIdx >= 0 && (
            <Lightbox
              item={media[openIdx]}
              onPrev={prev}
              onNext={next}
              onClose={close}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

/* ---------- Tile (uniform size via ratio-box) ---------- */
function Tile({ media, onOpen, ratioPt }) {
  return (
    <Box
      sx={{
        breakInside: "avoid-column",
        WebkitColumnBreakInside: "avoid",
        MozColumnBreakInside: "avoid",
        display: "block",
        width: "100%",
        mb: { xs: 1.25, sm: 1.5, md: 2 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {/* Ratio sizer to keep all tiles same height */}
        <Box sx={{ width: "100%", paddingTop: ratioPt }} />

        {/* Clickable layer (no ripple/transform) */}
        <Box
          component="button"
          type="button"
          onClick={onOpen}
          aria-label={
            media.caption ? `Open image: ${media.caption}` : "Open image"
          }
          sx={{
            all: "unset",
            position: "absolute",
            inset: 0,
            display: "block",
            cursor: "pointer",
            "& .overlay": {
              opacity: 0,
              transition: "opacity .18s linear",
              willChange: "opacity",
            },
            "&:hover .overlay, &:focus-visible .overlay": { opacity: 1 },
            "&:focus-visible": {
              outline: "2px solid #60ad5e",
              outlineOffset: 2,
            },
          }}
        >
          <Box
            component="img"
            src={media.src}
            alt={media.alt || ""}
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

          {(media.caption || media.alt) && (
            <Box
              className="overlay"
              sx={{
                pointerEvents: "none",
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                p: 1.25,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.0) 55%)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.95)",
                  fontWeight: 600,
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                }}
              >
                {media.caption || media.alt}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* ---------- Lightbox ---------- */
function Lightbox({ item, onPrev, onNext, onClose }) {
  // Prevent button clicks from closing modal
  const stop = (fn) => (e) => {
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
        backgroundColor: "rgba(20,20,20,0.95)",
        p: { xs: 1.25, sm: 1.5 },
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
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
        <Box
          component="img"
          src={item.src}
          alt={item.alt || ""}
          sx={{
            maxWidth: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            display: "block",
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </Box>

      {/* Caption + controls */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {(item.caption || item.alt) && (
          <Typography
            variant="body2"
            sx={{
              color: "common.white",
              opacity: 0.92,
              pr: 1,
              flex: "1 1 auto",
            }}
          >
            {item.caption || item.alt}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
          <TinyButton onClick={stop(onPrev)} ariaLabel="Previous image">
            ‹ Prev
          </TinyButton>
          <TinyButton onClick={stop(onNext)} ariaLabel="Next image">
            Next ›
          </TinyButton>
          <TinyButton onClick={stop(onClose)} ariaLabel="Close lightbox">
            × Close
          </TinyButton>
        </Box>
      </Box>
    </Box>
  );
}

/* ---------- Small, paint-safe buttons (no ripple/transform) ---------- */
function TinyButton({ children, onClick, ariaLabel }) {
  return (
    <Box
      component="button"
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      sx={{
        all: "unset",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 40,
        height: 36,
        px: 1.25,
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.3)",
        color: "white",
        backgroundColor: "rgba(255,255,255,0.06)",
        cursor: "pointer",
        transition: "background-color .12s linear, border-color .12s linear",
        "&:hover": {
          borderColor: "#60ad5e",
          backgroundColor: "rgba(96,173,94,0.12)",
        },
        "&:focus-visible": { outline: "2px solid #60ad5e", outlineOffset: 2 },
      }}
    >
      <Typography component="span" sx={{ fontSize: 14, fontWeight: 600 }}>
        {children}
      </Typography>
    </Box>
  );
}
