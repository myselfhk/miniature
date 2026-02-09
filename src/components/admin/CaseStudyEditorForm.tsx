"use client";

import { useState } from "react";
import { Block } from "@/lib/blocks";
import BlockEditor from "@/components/admin/BlockEditor";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Button } from "@/components/admin/ui/button";
import { Switch } from "@/components/admin/ui/switch";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/admin/ui/tabs";

type CaseStudyEditorFormProps = {
  initial?: {
    id?: string;
    title?: string;
    slug?: string;
    client_name?: string | null;
    one_liner?: string | null;
    industry?: string | null;
    tags?: string[] | null;
    status?: "draft" | "published";
    hero_media_path?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    og_image_path?: string | null;
    sections?: Block[];
    problem?: string | null;
    approach?: string | null;
    outcomes?: string | null;
    role?: string | null;
    year?: string | null;
  };
  action: (formData: FormData) => void;
};

export default function CaseStudyEditorForm({
  initial,
  action,
}: CaseStudyEditorFormProps) {
  const [blocks, setBlocks] = useState<Block[]>(
    initial?.sections && initial.sections.length
      ? initial.sections
      : [{ type: "heading", level: 2, text: "Overview" }],
  );
  const [published, setPublished] = useState(initial?.status === "published");

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-8">
        <div>
          <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
            Title
          </label>
          <Input
            name="title"
            defaultValue={initial?.title ?? ""}
            required
            className="text-lg font-medium"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
            One-liner
          </label>
          <Textarea
            name="one_liner"
            defaultValue={initial?.one_liner ?? ""}
            rows={2}
          />
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="border border-white/10 bg-white/5">
            <TabsTrigger value="content">Content Blocks</TabsTrigger>
            <TabsTrigger value="narrative">Narrative</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6 space-y-6">
            <div>
              <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
                Page Builder
              </label>
              <BlockEditor value={blocks} onChange={setBlocks} />
              <input
                type="hidden"
                name="sections"
                value={JSON.stringify(blocks)}
                readOnly
              />
            </div>
          </TabsContent>

          <TabsContent value="narrative" className="mt-6 space-y-6">
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
                  The Problem
                </label>
                <Textarea
                  name="problem"
                  defaultValue={initial?.problem ?? ""}
                  rows={4}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
                  Our Approach
                </label>
                <Textarea
                  name="approach"
                  defaultValue={initial?.approach ?? ""}
                  rows={4}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
                  Outcomes
                </label>
                <Textarea
                  name="outcomes"
                  defaultValue={initial?.outcomes ?? ""}
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <aside className="space-y-6">
        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
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

          <div className="flex flex-wrap gap-2">
            <Button
              type="submit"
              name="intent"
              value="save"
              variant="outline"
              className="flex-1"
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              name="intent"
              value="publish"
              className="flex-1"
            >
              Publish
            </Button>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="border-b border-white/10 pb-2 text-sm font-medium text-white">
            Metadata
          </h3>

          <div>
            <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
              Slug
            </label>
            <Input name="slug" defaultValue={initial?.slug ?? ""} />
          </div>

          <div>
            <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
              Client Name
            </label>
            <Input
              name="client_name"
              defaultValue={initial?.client_name ?? ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
                Role
              </label>
              <Input
                name="role"
                defaultValue={initial?.role ?? ""}
                placeholder="e.g. Lead"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
                Year
              </label>
              <Input
                name="year"
                defaultValue={initial?.year ?? ""}
                placeholder="2024"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
              Industry
            </label>
            <Input name="industry" defaultValue={initial?.industry ?? ""} />
          </div>

          <div>
            <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
              Tags (comma sep)
            </label>
            <Input name="tags" defaultValue={initial?.tags?.join(", ") ?? ""} />
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="border-b border-white/10 pb-2 text-sm font-medium text-white">
            Media & SEO
          </h3>

          <div>
            <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
              Hero Media
            </label>
            <ImageUploader
              label="Upload Cover"
              value={initial?.hero_media_path ?? ""}
              onChange={(path) => {
                const input = document.querySelector<HTMLInputElement>(
                  'input[name="hero_media_path"]',
                );
                if (input) input.value = path;
              }}
            />
            <input
              type="hidden"
              name="hero_media_path"
              defaultValue={initial?.hero_media_path ?? ""}
            />
          </div>

          <div className="space-y-4 border-t border-white/5 pt-4">
            <div>
              <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
                SEO Title
              </label>
              <Input name="seo_title" defaultValue={initial?.seo_title ?? ""} />
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-[0.3em] text-white/40 uppercase">
                SEO Desc
              </label>
              <Textarea
                name="seo_description"
                defaultValue={initial?.seo_description ?? ""}
                rows={2}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs tracking-[0.3em] text-white/40 uppercase">
                OG Image
              </label>
              <ImageUploader
                label="Upload OG"
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
          </div>
        </div>

        {initial?.id ? (
          <input type="hidden" name="id" value={initial.id} />
        ) : null}
      </aside>
    </form>
  );
}
