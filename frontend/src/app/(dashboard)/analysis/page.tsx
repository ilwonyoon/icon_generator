"use client";

import { StyleProfilePreview } from "@/components/analysis/style-profile-preview";
import { StylePreviewIcons } from "@/components/analysis/style-preview-icons";
import { StyleUploadDropzone } from "@/components/analysis/style-upload-dropzone";
import { UploadedIconsGallery } from "@/components/analysis/uploaded-icons-gallery";

export default function AnalysisPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium text-brand">Style Analysis</p>
        <p className="text-sm text-stone-600">
          Upload at least five icons to build a Style Profile capturing stroke width, corner rules,
          palette, and grid insights.
        </p>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)]">
        <div className="space-y-6">
          <StyleUploadDropzone />
          <UploadedIconsGallery />
        </div>
        <div className="space-y-6">
          <StyleProfilePreview />
          <StylePreviewIcons />
        </div>
      </section>
    </main>
  );
}
