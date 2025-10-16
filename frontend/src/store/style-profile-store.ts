"use client";

import { create } from "zustand";

export type StrokeMetrics = {
  widthMean: number;
  widthStd: number;
  caps: "butt" | "round";
  joins: "miter" | "round";
};

export type FillMetrics = {
  coverage: number;
  layers: number;
  renderMode: "monochrome" | "two_tone" | "hierarchical" | "palette";
};

export type PrimitiveMix = {
  circle?: number;
  rect?: number;
  roundedRect?: number;
  triangle?: number;
};

export type StyleProfile = {
  id: string;
  projectId?: string | null;
  iconType: "linear" | "solid" | "geometric_stacked" | "hybrid";
  gridSize: number;
  pixelSnap: boolean;
  cornerRadius: number;
  palette: string[];
  contrastMode: "mono" | "palette";
  symmetryScore: number;
  complexityScore: number;
  opticalCorrections: boolean;
  stroke?: StrokeMetrics;
  fill?: FillMetrics;
  primitiveMix?: PrimitiveMix;
  alignmentGridFit?: number;
  layerCount?: number;
  layerRoles?: string[];
  consistencyScore: number;
  notes?: string | null;
  createdAt?: string;
};

export type AnalysisState = "idle" | "uploading" | "success" | "error";

export type UploadedIcon = {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
};

export type ProfileAdjustments = {
  strokeScale: number;
  cornerScale: number;
  paletteIndex: number;
};

interface StyleProfileStore {
  profile: StyleProfile | null;
  state: AnalysisState;
  error: string | null;
  uploads: UploadedIcon[];
  adjustments: ProfileAdjustments;
  setProfile: (profile: StyleProfile | null) => void;
  setState: (state: AnalysisState) => void;
  setError: (error: string | null) => void;
  setUploads: (uploads: UploadedIcon[]) => void;
  updateAdjustments: (changes: Partial<ProfileAdjustments>) => void;
  resetAdjustments: () => void;
}

export const useStyleProfileStore = create<StyleProfileStore>((set) => ({
  profile: null,
  state: "idle",
  error: null,
  uploads: [],
  adjustments: {
    strokeScale: 1,
    cornerScale: 1,
    paletteIndex: 0
  },
  setProfile: (profile) => set({ profile }),
  setState: (state) => set({ state }),
  setError: (error) => set({ error }),
  setUploads: (uploads) => set({ uploads }),
  updateAdjustments: (changes) =>
    set((previous) => ({
      adjustments: { ...previous.adjustments, ...changes }
    })),
  resetAdjustments: () =>
    set({
      adjustments: { strokeScale: 1, cornerScale: 1, paletteIndex: 0 }
    })
}));
