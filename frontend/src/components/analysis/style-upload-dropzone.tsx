"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { analyzeStyle } from "@/lib/services/style-analysis";
import { useStyleProfileStore } from "@/store/style-profile-store";
import type { UploadedIcon } from "@/store/style-profile-store";

const ACCEPTED_TYPES = {
  "image/svg+xml": [".svg"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"]
};

const MAX_FILES = 50;

export function StyleUploadDropzone() {
  const setProfile = useStyleProfileStore((state) => state.setProfile);
  const setState = useStyleProfileStore((state) => state.setState);
  const setError = useStyleProfileStore((state) => state.setError);
  const setUploads = useStyleProfileStore((state) => state.setUploads);
  const resetAdjustments = useStyleProfileStore((state) => state.resetAdjustments);
  const [localError, setLocalError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLocalError(null);
      setError(null);

      if (!acceptedFiles.length) {
        setLocalError("Please choose at least one icon file");
        return;
      }

      if (acceptedFiles.length > MAX_FILES) {
        setLocalError(`Limit uploads to ${MAX_FILES} icons for analysis`);
        return;
      }

      try {
        const previews = await Promise.all(acceptedFiles.map(createPreviewFromFile));
        setUploads(previews);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Could not generate previews for uploads";
        setLocalError(message);
        setError(message);
        return;
      }

      setState("uploading");
      try {
        const profile = await analyzeStyle(acceptedFiles);
        setProfile(profile);
        resetAdjustments();
        setState("success");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to analyze icons";
        setError(message);
        setLocalError(message);
        setState("error");
      }
    },
    [setError, setProfile, setState, setUploads, resetAdjustments]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: MAX_FILES,
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-brand-accent/40 bg-white/80 px-6 py-12 text-center text-sm text-stone-600 transition hover:border-brand-accent hover:bg-white"
    >
      <input {...getInputProps()} />
      <p className="text-brand font-medium">Drop icons here or click to browse</p>
      <p className="max-w-xs text-xs text-stone-500">
        Supports SVG, PNG, JPG, ZIP (coming soon). Add at least five icons to infer style rules.
      </p>
      {isDragActive && <p className="text-brand-accent">Release to analyze</p>}
      {isDragReject && <p className="text-red-500">Unsupported file type</p>}
      {localError && <p className="text-red-500">{localError}</p>}
    </div>
  );
}

function createPreviewFromFile(file: File) {
  return new Promise<UploadedIcon>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: reader.result as string
      });
    };
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
