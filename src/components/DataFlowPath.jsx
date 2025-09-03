import * as React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";

/**
 * A confident, minimal diagram that shows the data journey.
 * Light motion (stroke dash) & node glow; reduced for prefers-reduced-motion.
 */

export default function DataFlowPath() {
  return (
    <Box
      id="dataflow"
      sx={{
        position: "relative",
        bgcolor: "black",
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
            Plot → Edge → Core
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: 28, sm: 34 },
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            Real‑time data path across NextG
          </Typography>
          <Typography
            sx={{
              opacity: 0.9,
              maxWidth: 820,
              mx: "auto",
              alignSelf: "center",
            }}
          >
            LoRa sensor data travel through our field gateways to 5G gNBs and
            MEC, where xApps can act. Aggregated results route to the core/cloud
            and back to researchers—closing the loop between experiment and
            insight.
          </Typography>
        </Stack>

        <Box sx={{ display: "grid", placeItems: "center" }}>
          <Diagram />
        </Box>
      </Container>
    </Box>
  );
}

function Diagram() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 980,
        aspectRatio: "16/7",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.18)",
        background:
          "radial-gradient(1200px 500px at 50% 100%, rgba(96,173,94,0.12), transparent 60%)",
      }}
    >
      <svg viewBox="0 0 980 430" width="100%" height="100%">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(96,173,94,0.0)" />
            <stop offset="50%" stopColor="rgba(96,173,94,1)" />
            <stop offset="100%" stopColor="rgba(96,173,94,0.0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .flow {
                stroke-dasharray: 10 14;
                animation: dash 4.8s linear infinite;
              }
              @keyframes dash {
                to { stroke-dashoffset: -280; }
              }
            }
          `}</style>
        </defs>

        {/* Nodes */}
        <Node x={130} y={310} label="LoRa sensors" />
        <Node x={320} y={240} label="PheNode / FieldDock" />
        <Node x={520} y={170} label="5G gNB" />
        <Node x={680} y={170} label="MEC (xApps)" />
        <Node x={860} y={90} label="Core / Cloud" small />

        {/* Paths */}
        <Path x1={150} y1={300} x2={320} y2={240} />
        <Path x1={340} y1={220} x2={520} y2={170} />
        <Path x1={540} y1={170} x2={680} y2={170} />
        <Path x1={700} y1={150} x2={860} y2={100} />

        {/* Return path (insights back) */}
        <path
          d="M860,110 C700,260 380,360 160,330"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 6"
        />
      </svg>
    </Box>
  );
}

function Node({ x, y, label, small }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle
        r={small ? 18 : 26}
        fill="rgba(96,173,94,0.15)"
        stroke="#60ad5e"
        strokeWidth="1"
        filter="url(#glow)"
      />
      <text
        x={0}
        y={small ? -34 : -40}
        textAnchor="middle"
        fontSize={12}
        fill="rgba(255,255,255,0.85)"
      >
        {label}
      </text>
    </g>
  );
}

function Path({ x1, y1, x2, y2 }) {
  const d = `M${x1},${y1} C ${(x1 + x2) / 2},${y1 - 40} ${(x1 + x2) / 2},${
    y2 + 40
  } ${x2},${y2}`;
  return (
    <path
      d={d}
      stroke="url(#g)"
      strokeWidth="3"
      className="flow"
      fill="none"
      filter="url(#glow)"
    />
  );
}
