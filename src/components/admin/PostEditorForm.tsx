"use client";

import { useState } from "react";
import { Block } from "@/lib/blocks";
import BlockEditor from "@/components/admin/BlockEditor";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Button } from "@/components/admin/ui/button";
import { Switch } from "@/components/admin/ui/switch";
import ImageUploader from "@/components/admin/ImageUploader";

type PostEditorFormProps = {
  initial?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string | null;
    tags?: string[] | null;
    status?: "draft" | "published";
    cover_image_path?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    og_image_path?: string | null;
    content?: Block[];
  };
  action: (formData: FormData) => void;
};

export default function PostEditorForm({
  initial,
  action,
}: PostEditorFormProps) {
  const [blocks, setBlocks] = useState<Block[]>(
    initial?.content && initial.content.length
      ? initial.content
      : [{ type: "paragraph", text: "" }],
  );
  const [published, setPublished] = useState(initial?.status === "published");

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-6">
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            Title
          </label>
          <Input name="title" defaultValue={initial?.title ?? ""} required />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            Excerpt
          </label>
          <Textarea name="excerpt" defaultValue={initial?.excerpt ?? ""} />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            Content
          </label>
          <BlockEditor value={blocks} onChange={setBlocks} />
          <input
            type="hidden"
            name="content"
            value={JSON.stringify(blocks)}
            readOnly
          />
        </div>
      </div>
      <aside className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
              Status
            </p>
            <p className="text-sm text-white">
              {published ? "Published" : "Draft"}
            </p>
          </div>
          <Switch checked={published} onCheckedChange={setPublished} />
          <input
            type="hidden"
            name="status"
            value={published ? "published" : "draft"}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            Slug
          </label>
          <Input name="slug" defaultValue={initial?.slug ?? ""} />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            Tags
          </label>
          <Input name="tags" defaultValue={initial?.tags?.join(", ") ?? ""} />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            Cover image
          </label>
          <ImageUploader
            label="Upload"
            value={initial?.cover_image_path ?? ""}
            onChange={(path) => {
              const input = document.querySelector<HTMLInputElement>(
                'input[name="cover_image_path"]',
              );
              if (input) input.value = path;
            }}
          />
          <input
            type="hidden"
            name="cover_image_path"
            defaultValue={initial?.cover_image_path ?? ""}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            SEO title
          </label>
          <Input name="seo_title" defaultValue={initial?.seo_title ?? ""} />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            SEO description
          </label>
          <Textarea
            name="seo_description"
            defaultValue={initial?.seo_description ?? ""}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] text-white/40 uppercase">
            OG image
          </label>
          <ImageUploader
            label="Upload"
            value={initial?.og_image_path ?? ""}
            onChange={(path) => {
              const input = document.querySelector<HTMLInputElement>(
                'input[name="og_image_path"]',
              );
              if (input) input.value = path;
            }}
          />
          <input
            type="hidden"
            name="og_image_path"
            defaultValue={initial?.og_image_path ?? ""}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" name="intent" value="save" variant="outline">
            Save
          </Button>
          <Button type="submit" name="intent" value="publish">
            Publish
          </Button>
        </div>
        {initial?.id ? (
          <input type="hidden" name="id" value={initial.id} />
        ) : null}
      </aside>
    </form>
  );
}
