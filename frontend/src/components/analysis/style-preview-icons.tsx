"use client";

import { useMemo } from "react";

import { useStyleProfileStore } from "@/store/style-profile-store";

const SAMPLE_LABELS = ["Home", "Search", "User", "Settings", "Cart"] as const;

type IconProps = {
  strokeWidth: number;
  strokeColor: string;
  fillColor: string;
  secondaryColor: string;
  cornerRadius: number;
};

type SampleLabel = (typeof SAMPLE_LABELS)[number];

type SampleIcon = {
  name: SampleLabel;
  render: (props: IconProps) => JSX.Element;
};

const sampleIcons: SampleIcon[] = [
  {
    name: "Home",
    render: ({ strokeWidth, strokeColor, fillColor, cornerRadius }) => (
      <svg viewBox="0 0 24 24" role="img" aria-label="Home icon preview">
        <path
          d="M4.5 10.5 12 4l7.5 6.5"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect
          x={7.5}
          y={10.5}
          width={9}
          height={8.5}
          rx={Math.min(cornerRadius, 4)}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <path
          d="M10.5 18.5v-3.5h3v3.5"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    name: "Search",
    render: ({ strokeWidth, strokeColor }) => (
      <svg viewBox="0 0 24 24" role="img" aria-label="Search icon preview">
        <circle
          cx={10.5}
          cy={10.5}
          r={5.5}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <line
          x1={15.2}
          y1={15.2}
          x2={20.5}
          y2={20.5}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    name: "User",
    render: ({ strokeWidth, strokeColor, fillColor, secondaryColor }) => (
      <svg viewBox="0 0 24 24" role="img" aria-label="User icon preview">
        <circle
          cx={12}
          cy={8.5}
          r={3.5}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={fillColor}
        />
        <path
          d="M6 19.5c0-3.2 2.8-5 6-5s6 1.8 6 5"
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    )
  },
  {
    name: "Settings",
    render: ({ strokeWidth, strokeColor, fillColor, secondaryColor }) => (
      <svg viewBox="0 0 24 24" role="img" aria-label="Settings icon preview">
        <circle
          cx={12}
          cy={12}
          r={2.5}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={fillColor}
        />
        {[0, 60, 120].map((rotation) => (
          <g key={rotation} transform={`rotate(${rotation} 12 12)`}>
            <rect
              x={11.2}
              y={4.5}
              width={1.6}
              height={4}
              rx={0.8}
              fill={secondaryColor}
            />
            <rect
              x={11.2}
              y={15.5}
              width={1.6}
              height={4}
              rx={0.8}
              fill={secondaryColor}
            />
          </g>
        ))}
      </svg>
    )
  },
  {
    name: "Cart",
    render: ({ strokeWidth, strokeColor, fillColor, cornerRadius }) => (
      <svg viewBox="0 0 24 24" role="img" aria-label="Cart icon preview">
        <path
          d="M4.5 5h2l1.5 9.5h8.5l1.5-6.5H7.2"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect
          x={8.5}
          y={8.8}
          width={8}
          height={4.2}
          rx={Math.min(cornerRadius, 3)}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth / 1.5}
        />
        <circle cx={9.5} cy={18.5} r={1.2} fill={strokeColor} />
        <circle cx={16.5} cy={18.5} r={1.2} fill={strokeColor} />
      </svg>
    )
  }
];

export function StylePreviewIcons() {
  const { profile, adjustments } = useStyleProfileStore((state) => ({
    profile: state.profile,
    adjustments: state.adjustments
  }));

  const computed = useMemo(() => {
    if (!profile) return null;

    const paletteLength = profile.palette.length;
    const strokeColor =
      paletteLength > 0
        ? profile.palette[Math.min(adjustments.paletteIndex, paletteLength - 1)]
        : "#111827";
    const secondaryColor =
      paletteLength > 1
        ? profile.palette[(Math.min(adjustments.paletteIndex, paletteLength - 1) + 1) % paletteLength]
        : strokeColor;

    const baseStroke = profile.stroke?.widthMean ?? 0;
    const adjustedStroke = baseStroke * adjustments.strokeScale;

    let fillColor = strokeColor;
    switch (profile.iconType) {
      case "linear":
        fillColor = "none";
        break;
      case "solid":
        fillColor = strokeColor;
        break;
      case "geometric_stacked":
        fillColor = strokeColor;
        break;
      case "hybrid":
        fillColor =
          profile.fill?.renderMode === "two_tone" ||
          profile.fill?.renderMode === "hierarchical" ||
          profile.fill?.renderMode === "palette"
            ? secondaryColor
            : strokeColor;
        break;
      default:
        fillColor = strokeColor;
    }

    const previewStrokeWidth =
      profile.iconType === "solid"
        ? Number(Math.max(adjustedStroke, 0.8).toFixed(2))
        : Number(adjustedStroke.toFixed(2));

    return {
      strokeWidth: previewStrokeWidth,
      strokeColor,
      fillColor,
      secondaryColor,
      cornerRadius: profile.cornerRadius * adjustments.cornerScale
    } satisfies IconProps;
  }, [profile, adjustments]);

  if (!profile || !computed) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-brand">Preview common icons</h2>
        <span className="text-xs text-stone-400">Based on current adjustments</span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {sampleIcons.map((icon) => (
          <div
            key={icon.name}
            className="flex flex-col items-center gap-2 rounded-xl border border-stone-100 bg-stone-50/80 p-4 text-center"
          >
            <div className="h-16 w-16">
              {icon.render(computed)}
            </div>
            <p className="text-xs font-medium text-stone-600">{icon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
