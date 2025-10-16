import { API_ROUTES } from "@/lib/api";
import type { StyleProfile } from "@/store/style-profile-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8300";

type RawStrokeMetrics = {
  width_mean: number;
  width_std: number;
  caps: "butt" | "round";
  joins: "miter" | "round";
};

type RawFillMetrics = {
  coverage: number;
  layers: number;
  render_mode: "monochrome" | "two_tone" | "hierarchical" | "palette";
};

type RawPrimitiveMix = {
  circle?: number;
  rect?: number;
  rounded_rect?: number;
  triangle?: number;
};

type RawStyleProfile = {
  id: string;
  project_id?: string | null;
  icon_type: "linear" | "solid" | "geometric_stacked" | "hybrid";
  grid_size: number;
  pixel_snap: boolean;
  corner_radius: number;
  palette: string[];
  contrast_mode: "mono" | "palette";
  symmetry_score: number;
  complexity_score: number;
  optical_corrections: boolean;
  stroke?: RawStrokeMetrics | null;
  fill?: RawFillMetrics | null;
  primitive_mix?: RawPrimitiveMix | null;
  alignment_grid_fit?: number | null;
  layer_count?: number | null;
  layer_roles?: string[] | null;
  consistency_score: number;
  notes?: string | null;
  created_at?: string;
};

export async function analyzeStyle(files: File[]): Promise<StyleProfile> {
  if (files.length === 0) {
    throw new Error("Select at least one file");
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file, file.name);
  });

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${API_ROUTES.analyzeStyle}`, {
      method: "POST",
      body: formData
    });
  } catch (error) {
    throw new Error(
      `Unable to reach IconForge API at ${BASE_URL}. Start the backend with \`uvicorn app.main:app --host 127.0.0.1 --port 8300\` and try again.`
    );
  }

  if (!response.ok) {
    const text = await response.text();
    const statusMessage = `Request failed with status ${response.status}`;
    throw new Error(text || statusMessage);
  }

  const data = (await response.json()) as RawStyleProfile;

  return normalizeStyleProfile(data);
}

function normalizeStyleProfile(profile: RawStyleProfile): StyleProfile {
  const stroke = profile.stroke
    ? {
        widthMean: profile.stroke.width_mean,
        widthStd: profile.stroke.width_std,
        caps: profile.stroke.caps,
        joins: profile.stroke.joins
      }
    : undefined;

  const fill = profile.fill
    ? {
        coverage: profile.fill.coverage,
        layers: profile.fill.layers,
        renderMode: profile.fill.render_mode
      }
    : undefined;

  const primitiveMix = profile.primitive_mix
    ? {
        circle: profile.primitive_mix.circle,
        rect: profile.primitive_mix.rect,
        roundedRect: profile.primitive_mix.rounded_rect,
        triangle: profile.primitive_mix.triangle
      }
    : undefined;

  return {
    id: profile.id,
    projectId: profile.project_id ?? null,
    iconType: profile.icon_type,
    gridSize: profile.grid_size,
    pixelSnap: profile.pixel_snap,
    cornerRadius: profile.corner_radius,
    contrastMode: profile.contrast_mode,
    symmetryScore: profile.symmetry_score,
    complexityScore: profile.complexity_score,
    opticalCorrections: profile.optical_corrections,
    stroke,
    fill,
    primitiveMix,
    alignmentGridFit: profile.alignment_grid_fit ?? undefined,
    layerCount: profile.layer_count ?? undefined,
    layerRoles: profile.layer_roles ?? undefined,
    palette: profile.palette,
    consistencyScore: profile.consistency_score,
    notes: profile.notes ?? undefined,
    createdAt: profile.created_at
  };
}
