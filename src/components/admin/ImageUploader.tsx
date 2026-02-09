"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/admin/ui/button";

type ImageUploaderProps = {
  label: string;
  value?: string;
  onChange: (path: string) => void;
};

export default function ImageUploader({
  label,
  value,
  onChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = getSupabaseBrowserClient();
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("uploads")
      .upload(path, file, {
        upsert: true,
      });
    setUploading(false);
    if (!error) onChange(path);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="rounded-md border border-white/20 px-3 py-2 text-xs tracking-[0.3em] text-white/70 uppercase">
        {label}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>
      <Button type="button" variant="ghost" size="sm" disabled>
        {uploading ? "Uploading..." : value ? "Uploaded" : "No file"}
      </Button>
    </div>
  );
}
