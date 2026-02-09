"use client";

import { useMemo, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@/lib/blocks";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import ImageUploader from "@/components/admin/ImageUploader";

type BlockEditorProps = {
  value: Block[];
  onChange: (blocks: Block[]) => void;
};

const blockOptions = [
  { type: "heading", label: "Heading" },
  { type: "paragraph", label: "Paragraph" },
  { type: "image", label: "Image" },
  { type: "quote", label: "Quote" },
  { type: "bullet_list", label: "Bullet list" },
  { type: "divider", label: "Divider" },
  { type: "callout", label: "Callout" },
  { type: "cta", label: "CTA" },
  { type: "metrics_grid", label: "Metrics Grid" },
  { type: "work_card", label: "Work Card" },
  { type: "pricing_card", label: "Pricing Card" },
  { type: "faq_list", label: "FAQ List" },
];

export default function BlockEditor({ value, onChange }: BlockEditorProps) {
  const [selectedType, setSelectedType] = useState("paragraph");
  const ids = useMemo(() => value.map((_, index) => index.toString()), [value]);

  const addBlock = () => {
    let next: Block;
    switch (selectedType) {
      case "heading":
        next = { type: "heading", level: 2, text: "Heading" };
        break;
      case "paragraph":
        next = { type: "paragraph", text: "Paragraph" };
        break;
      case "image":
        next = { type: "image", path: "", alt: "" };
        break;
      case "quote":
        next = { type: "quote", text: "Quote" };
        break;
      case "bullet_list":
        next = { type: "bullet_list", items: ["List item"] };
        break;
      case "divider":
        next = { type: "divider" };
        break;
      case "callout":
        next = { type: "callout", text: "Callout" };
        break;
      case "cta":
        next = {
          type: "cta",
          label: "Start a project",
          href: "/start-a-project",
        };
        break;
      case "metrics_grid":
        next = {
          type: "metrics_grid",
          metrics: [{ value: "50%", label: "Growth" }],
        };
        break;
      case "work_card":
        next = { type: "work_card", case_study_id: "" };
        break;
      case "pricing_card":
        next = {
          type: "pricing_card",
          title: "Plan",
          price: "$5k",
          features: ["Feature 1"],
          cta_label: "Start",
          cta_href: "/start",
        };
        break;
      case "faq_list":
        next = {
          type: "faq_list",
          items: [{ question: "Question?", answer: "Answer." }],
        };
        break;
      default:
        next = { type: "paragraph", text: "" };
    }
    onChange([...value, next]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="h-10 rounded-md border border-white/15 bg-transparent px-3 text-sm text-white"
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          {blockOptions.map((option) => (
            <option key={option.type} value={option.type}>
              {option.label}
            </option>
          ))}
        </select>
        <Button type="button" variant="outline" onClick={addBlock}>
          Add block
        </Button>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            const oldIndex = ids.indexOf(String(active.id));
            const newIndex = ids.indexOf(String(over.id));
            onChange(arrayMove(value, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {value.map((block, index) => (
              <SortableBlock
                key={index}
                id={index.toString()}
                label={block.type}
                onRemove={() => onChange(value.filter((_, i) => i !== index))}
              >
                <div className="mt-3 space-y-3">
                  {block.type === "heading" ? (
                    <>
                      <Input
                        value={block.text}
                        onChange={(event) => {
                          const next = [...value];
                          next[index] = { ...block, text: event.target.value };
                          onChange(next);
                        }}
                      />
                      <select
                        className="h-10 rounded-md border border-white/15 bg-transparent px-3 text-sm text-white"
                        value={block.level}
                        onChange={(event) => {
                          const next = [...value];
                          next[index] = {
                            ...block,
                            level: Number(event.target.value) as 2 | 3,
                          };
                          onChange(next);
                        }}
                      >
                        <option value={2}>H2</option>
                        <option value={3}>H3</option>
                      </select>
                    </>
                  ) : null}
                  {block.type === "paragraph" ? (
                    <Textarea
                      value={block.text}
                      onChange={(event) => {
                        const next = [...value];
                        next[index] = { ...block, text: event.target.value };
                        onChange(next);
                      }}
                    />
                  ) : null}
                  {block.type === "quote" ? (
                    <Textarea
                      value={block.text}
                      onChange={(event) => {
                        const next = [...value];
                        next[index] = { ...block, text: event.target.value };
                        onChange(next);
                      }}
                    />
                  ) : null}
                  {block.type === "callout" ? (
                    <Textarea
                      value={block.text}
                      onChange={(event) => {
                        const next = [...value];
                        next[index] = { ...block, text: event.target.value };
                        onChange(next);
                      }}
                    />
                  ) : null}
                  {block.type === "bullet_list" ? (
                    <Textarea
                      value={block.items.join("\n")}
                      onChange={(event) => {
                        const next = [...value];
                        next[index] = {
                          ...block,
                          items: event.target.value.split("\n").filter(Boolean),
                        };
                        onChange(next);
                      }}
                    />
                  ) : null}
                  {block.type === "image" ? (
                    <>
                      <ImageUploader
                        label="Upload image"
                        value={block.path}
                        onChange={(path) => {
                          const next = [...value];
                          next[index] = { ...block, path };
                          onChange(next);
                        }}
                      />
                      <Input
                        placeholder="Alt text"
                        value={block.alt ?? ""}
                        onChange={(event) => {
                          const next = [...value];
                          next[index] = { ...block, alt: event.target.value };
                          onChange(next);
                        }}
                      />
                      <Input
                        placeholder="Caption"
                        value={block.caption ?? ""}
                        onChange={(event) => {
                          const next = [...value];
                          next[index] = {
                            ...block,
                            caption: event.target.value,
                          };
                          onChange(next);
                        }}
                      />
                    </>
                  ) : null}
                  {block.type === "cta" ? (
                    <>
                      <Input
                        placeholder="Label"
                        value={block.label}
                        onChange={(event) => {
                          const next = [...value];
                          next[index] = { ...block, label: event.target.value };
                          onChange(next);
                        }}
                      />
                      <Input
                        placeholder="Href"
                        value={block.href}
                        onChange={(event) => {
                          const next = [...value];
                          next[index] = { ...block, href: event.target.value };
                          onChange(next);
                        }}
                      />
                    </>
                  ) : null}
                  {block.type === "divider" ? (
                    <p className="text-xs text-white/40">Divider block</p>
                  ) : null}
                  {block.type === "work_card" ? (
                    <Input
                      placeholder="Case Study Slug (e.g. 'fintech-app')"
                      value={block.case_study_id}
                      onChange={(event) => {
                        const next = [...value];
                        next[index] = {
                          ...block,
                          case_study_id: event.target.value,
                        };
                        onChange(next);
                      }}
                    />
                  ) : null}
                  {block.type === "metrics_grid" ? (
                    <div className="space-y-2">
                      {block.metrics.map((metric, mIndex) => (
                        <div key={mIndex} className="flex gap-2">
                          <Input
                            placeholder="Value (e.g. 50%)"
                            value={metric.value}
                            onChange={(event) => {
                              const next = [...value];
                              const newMetrics = [...block.metrics];
                              newMetrics[mIndex] = {
                                ...metric,
                                value: event.target.value,
                              };
                              next[index] = { ...block, metrics: newMetrics };
                              onChange(next);
                            }}
                          />
                          <Input
                            placeholder="Label (e.g. Growth)"
                            value={metric.label}
                            onChange={(event) => {
                              const next = [...value];
                              const newMetrics = [...block.metrics];
                              newMetrics[mIndex] = {
                                ...metric,
                                label: event.target.value,
                              };
                              next[index] = { ...block, metrics: newMetrics };
                              onChange(next);
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const next = [...value];
                              const newMetrics = block.metrics.filter(
                                (_, i) => i !== mIndex,
                              );
                              next[index] = { ...block, metrics: newMetrics };
                              onChange(next);
                            }}
                          >
                            X
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const next = [...value];
                          const newMetrics = [
                            ...block.metrics,
                            { value: "", label: "" },
                          ];
                          next[index] = { ...block, metrics: newMetrics };
                          onChange(next);
                        }}
                      >
                        Add Metric
                      </Button>
                    </div>
                  ) : null}
                  {block.type === "pricing_card" ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="Title (e.g. Sprint)"
                        value={block.title}
                        onChange={(e) => {
                          const next = [...value];
                          next[index] = { ...block, title: e.target.value };
                          onChange(next);
                        }}
                      />
                      <Input
                        placeholder="Price (e.g. $5k)"
                        value={block.price}
                        onChange={(e) => {
                          const next = [...value];
                          next[index] = { ...block, price: e.target.value };
                          onChange(next);
                        }}
                      />
                      <Textarea
                        placeholder="Features (one per line)"
                        value={block.features.join("\n")}
                        onChange={(e) => {
                          const next = [...value];
                          next[index] = {
                            ...block,
                            features: e.target.value
                              .split("\n")
                              .filter(Boolean),
                          };
                          onChange(next);
                        }}
                      />
                      <Input
                        placeholder="CTA Label"
                        value={block.cta_label}
                        onChange={(e) => {
                          const next = [...value];
                          next[index] = { ...block, cta_label: e.target.value };
                          onChange(next);
                        }}
                      />
                      <Input
                        placeholder="CTA Href"
                        value={block.cta_href}
                        onChange={(e) => {
                          const next = [...value];
                          next[index] = { ...block, cta_href: e.target.value };
                          onChange(next);
                        }}
                      />
                    </div>
                  ) : null}
                  {block.type === "faq_list" ? (
                    <div className="space-y-4">
                      {block.items.map((item, i) => (
                        <div
                          key={i}
                          className="space-y-2 border-l border-white/10 pl-4"
                        >
                          <Input
                            placeholder="Question"
                            value={item.question}
                            onChange={(e) => {
                              const next = [...value];
                              const newItems = [...block.items];
                              newItems[i] = {
                                ...item,
                                question: e.target.value,
                              };
                              next[index] = { ...block, items: newItems };
                              onChange(next);
                            }}
                          />
                          <Textarea
                            placeholder="Answer"
                            value={item.answer}
                            onChange={(e) => {
                              const next = [...value];
                              const newItems = [...block.items];
                              newItems[i] = { ...item, answer: e.target.value };
                              next[index] = { ...block, items: newItems };
                              onChange(next);
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const next = [...value];
                              const newItems = block.items.filter(
                                (_, idx) => idx !== i,
                              );
                              next[index] = { ...block, items: newItems };
                              onChange(next);
                            }}
                          >
                            Remove Item
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const next = [...value];
                          const newItems = [
                            ...block.items,
                            { question: "", answer: "" },
                          ];
                          next[index] = { ...block, items: newItems };
                          onChange(next);
                        }}
                      >
                        Add FAQ Item
                      </Button>
                    </div>
                  ) : null}
                </div>
              </SortableBlock>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableBlock({
  id,
  label,
  children,
  onRemove,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl border border-white/10 bg-white/5 p-4"
      {...attributes}
    >
      <div className="flex items-center justify-between text-xs tracking-[0.3em] text-white/40 uppercase">
        <button
          type="button"
          className="cursor-grab text-xs tracking-[0.3em] text-white/40 uppercase"
          {...listeners}
        >
          {label}
        </button>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </div>
      {children}
    </div>
  );
}
