import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FitMatrix() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const rows = [
    "Open & integrated networks (Open RAN)",
    "LoRa → 5G data transport (PDUs)",
    "MEC analytics via xApps",
    "RIS / UAV augmentation",
    "Coverage at research & roadside scale",
    "Energy, scalability, security tradeoffs",
    "Flexible, structured/unstructured data flow",
  ];

  const cols = [
    "HPI diversity field",
    "Climate Smart field",
    "Existing LoRa sensors",
    "UAV imaging",
    "FieldDock gateway",
    "Partner access (Danforth/Agrela)",
  ];

  const checks = new Set([
    // Row idx, Col idx pairs that are "true"
    "0,2",
    "0,5",
    "1,2",
    "1,4",
    "2,4",
    "2,5",
    "3,3",
    "3,5",
    "4,0",
    "4,1",
    "4,3",
    "5,0",
    "5,1",
    "5,5",
    "6,0",
    "6,1",
    "6,4",
  ]);

  return (
    <Box
      id="fit"
      sx={{
        position: "relative",
        bgcolor: "common.black",
        color: "common.white",
        py: { xs: 8, md: 14 },
        overflow: "hidden",
      }}
    >
      <Container>
        <Stack spacing={{ xs: 2, md: 3 }} sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, opacity: 0.75 }}
          >
            Why here
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 28, sm: 34 },
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            Our fields align with INGEARS research goals
          </Typography>
          <Typography
            sx={{
              opacity: 0.9,
              maxWidth: 860,
              mx: "auto",
              alignSelf: "center",
            }}
          >
            The matrix below shows how our living testbeds and instrumentation
            map to the project’s core technical objectives—making our site a
            low‑friction, high‑signal venue for at‑scale validation.
          </Typography>
        </Stack>

        {isSm ? (
          <MobileBlocks rows={rows} cols={cols} checks={checks} />
        ) : (
          <DesktopMatrix rows={rows} cols={cols} checks={checks} />
        )}
      </Container>
    </Box>
  );
}

function DesktopMatrix({ rows, cols, checks }) {
  const [hover, setHover] = React.useState({ r: -1, c: -1 });

  return (
    <Box
      role="table"
      sx={{
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 3,
        overflow: "auto",
      }}
    >
      {/* Header */}
      <Box
        role="row"
        sx={{
          display: "grid",
          gridTemplateColumns: `minmax(220px, 1fr) repeat(${cols.length}, minmax(160px, 1fr))`,
          borderBottom: "1px solid rgba(255,255,255,0.18)",
          bgcolor: "rgba(255,255,255,0.03)",
        }}
      >
        <Cell header sticky>
          INGEARS objective
        </Cell>
        {cols.map((c, ci) => (
          <Cell key={ci} header>
            {c}
          </Cell>
        ))}
      </Box>

      {/* Body */}
      {rows.map((r, ri) => (
        <Box
          role="row"
          key={ri}
          sx={{
            display: "grid",
            gridTemplateColumns: `minmax(220px, 1fr) repeat(${cols.length}, minmax(160px, 1fr))`,
            borderBottom:
              ri === rows.length - 1
                ? "none"
                : "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Cell
            sticky
            onMouseEnter={() => setHover({ r: ri, c: -1 })}
            onMouseLeave={() => setHover({ r: -1, c: -1 })}
          >
            {r}
          </Cell>
          {cols.map((_, ci) => {
            const on = checks.has(`${ri},${ci}`);
            const isRow = hover.r === ri;
            const isCol = hover.c === ci;
            return (
              <Cell
                key={ci}
                onMouseEnter={() => setHover({ r: ri, c: ci })}
                onMouseLeave={() => setHover({ r: -1, c: -1 })}
                highlight={isRow || isCol}
                on={on}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

function MobileBlocks({ rows, cols, checks }) {
  return (
    <Stack spacing={2}>
      {rows.map((r, ri) => {
        const hits = cols.filter((_, ci) => checks.has(`${ri},${ci}`));
        return (
          <Box
            key={ri}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.18)",
              bgcolor: "rgba(255,255,255,0.03)",
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {r}
            </Typography>
            <Typography sx={{ opacity: 0.9 }}>
              {hits.length ? hits.join(" • ") : "—"}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}

function Cell({
  children,
  header = false,
  sticky = false,
  highlight = false,
  on = false,
  ...rest
}) {
  return (
    <Box
      role={header ? "columnheader" : "cell"}
      {...rest}
      sx={{
        p: 2,
        position: sticky ? "sticky" : "static",
        left: sticky ? 0 : "auto",
        backdropFilter: sticky ? "blur(2px)" : "none",
        borderRight: "1px solid rgba(255,255,255,0.10)",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        bgcolor: header
          ? "rgba(255,255,255,0.03)"
          : highlight
          ? "rgba(96,173,94,0.10)"
          : "transparent",
        color: header ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.9)",
        "&::after": on
          ? {
              content: '""',
              width: 10,
              height: 10,
              borderRadius: "50%",
              ml: "auto",
              boxShadow:
                "0 0 0 4px rgba(96,173,94,0.12), 0 0 10px rgba(96,173,94,0.55)",
              backgroundColor: "#60ad5e",
            }
          : undefined,
      }}
    >
      {children}
    </Box>
  );
}
