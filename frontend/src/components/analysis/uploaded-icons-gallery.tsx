"use client";

import { useStyleProfileStore } from "@/store/style-profile-store";

export function UploadedIconsGallery() {
  const uploads = useStyleProfileStore((state) => state.uploads);

  if (!uploads.length) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-500">
        Uploaded icons will appear here for quick visual reference.
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-brand">Uploaded Icons</h2>
        <span className="text-xs text-stone-400">{uploads.length} files</span>
      </div>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {uploads.map((icon) => (
          <figure key={icon.id} className="flex flex-col items-center gap-2 text-center text-xs">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon.previewUrl} alt={icon.name} className="h-12 w-12 object-contain" />
            </div>
            <figcaption className="max-w-[5rem] truncate text-stone-500" title={icon.name}>
              {icon.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
