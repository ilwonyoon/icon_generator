"use client";

import { useStyleProfileStore } from "@/store/style-profile-store";
import type { StyleProfile } from "@/store/style-profile-store";

export function StyleProfilePreview() {
  const { profile, state, error, adjustments, updateAdjustments } = useStyleProfileStore(
    (state) => ({
      profile: state.profile,
      state: state.state,
      error: state.error,
      adjustments: state.adjustments,
      updateAdjustments: state.updateAdjustments
    })
  );

  if (state === "uploading") {
    return (
      <div className="rounded-xl border border-brand-accent/30 bg-white p-6 text-sm text-brand">
        Analyzing icons… extracting stroke, grid, and palette metrics.
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-500">
        Upload icons to generate a Style Profile. We’ll capture stroke width, grid, palette, and
        consistency score.
      </div>
    );
  }

  const baseStroke = profile.stroke?.widthMean ?? 0;
  const adjustedStroke = baseStroke * adjustments.strokeScale;
  const adjustedCorner = profile.cornerRadius * adjustments.cornerScale;
  const hasStroke = Boolean(profile.stroke);

  const formatIconType = (type: StyleProfile["iconType"]) => {
    switch (type) {
      case "linear":
        return "Linear (stroke-only)";
      case "solid":
        return "Solid / glyph";
      case "geometric_stacked":
        return "Geometric-stacked";
      case "hybrid":
        return "Hybrid (two-tone)";
      default:
        return type;
    }
  };

  return (
    <div className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-brand">Style Profile</h2>
        <span className="text-xs uppercase tracking-wide text-stone-400">ID: {profile.id}</span>
      </header>
      <dl className="grid gap-4 sm:grid-cols-2">
        <ProfileItem label="Icon type" value={formatIconType(profile.iconType)} />
        <ProfileItem label="Grid" value={`${profile.gridSize} × ${profile.gridSize}`} />
        <ProfileItem label="Pixel snap" value={profile.pixelSnap ? "Enabled" : "Off"} />
        <ProfileItem
          label="Stroke"
          value={
            hasStroke
              ? `${adjustedStroke.toFixed(2)} px (${profile.stroke?.caps} caps)`
              : "None"
          }
        />
        <ProfileItem label="Corner radius" value={`${adjustedCorner.toFixed(2)} px`} />
        <ProfileItem label="Contrast" value={profile.contrastMode === "mono" ? "Monochrome" : "Palette"} />
        <ProfileItem label="Complexity" value={profile.complexityScore.toFixed(2)} />
        <ProfileItem label="Symmetry" value={profile.symmetryScore.toFixed(2)} />
        {profile.alignmentGridFit !== undefined && (
          <ProfileItem label="Grid fit" value={profile.alignmentGridFit.toFixed(2)} />
        )}
        <ProfileItem
          label="Consistency"
          value={`${(profile.consistencyScore * 100).toFixed(0)}%`}
        />
        <ProfileItem
          label="Optical corrections"
          value={profile.opticalCorrections ? "Applied" : "Not applied"}
        />
      </dl>
      {profile.notes && (
        <div className="rounded-lg bg-stone-50 p-3 text-xs text-stone-600">
          {profile.notes}
        </div>
      )}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-stone-400">Palette</p>
        <div className="mt-2 flex gap-2">
          {profile.palette.map((color) => (
            <div key={color} className="flex items-center gap-2">
              <span
                className="h-6 w-6 rounded-full border border-stone-200"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-stone-500">{color}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-stone-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
          Adjust preview parameters
        </p>
        <div className="space-y-3">
          <ControlRow
            label="Stroke width"
            min={60}
            max={140}
            value={Math.round(adjustments.strokeScale * 100)}
            onChange={(value) => updateAdjustments({ strokeScale: value / 100 })}
            display={hasStroke ? `${adjustedStroke.toFixed(2)} px` : "N/A"}
            disabled={!hasStroke}
          />
          <ControlRow
            label="Corner radius"
            min={60}
            max={140}
            value={Math.round(adjustments.cornerScale * 100)}
            onChange={(value) => updateAdjustments({ cornerScale: value / 100 })}
            display={`${adjustedCorner.toFixed(2)} px`}
          />
          {profile.palette.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-stone-500">Accent color</p>
              <div className="flex flex-wrap gap-2">
                {profile.palette.map((color, index) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => updateAdjustments({ paletteIndex: index })}
                    className={`h-8 w-8 rounded-full border transition ${
                      adjustments.paletteIndex === index
                        ? "scale-110 border-brand shadow"
                        : "border-stone-200"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Use ${color} for preview`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">{label}</dt>
      <dd className="text-sm text-brand">{value}</dd>
    </div>
  );
}

function ControlRow({
  label,
  min,
  max,
  value,
  onChange,
  display,
  disabled
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  display: string;
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-stone-500">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        <span className="font-medium text-stone-700">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-brand"
        disabled={disabled}
      />
    </label>
  );
}
